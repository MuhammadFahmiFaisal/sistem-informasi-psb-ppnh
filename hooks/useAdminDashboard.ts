import React, { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabaseClient';
import { SCRIPT_URL } from '../lib/registrationConstants';
import { Registrant, GalleryItem, VideoItem, NewsItem, FacilityItem, StudentWork, Profile } from '../components/admin/types';
import { compressImage } from '../lib/imageUtils';

export const useAdminDashboard = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoginLoading, setIsLoginLoading] = useState(false);
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null);

  const [registrants, setRegistrants] = useState<Registrant[]>([]);
  const [filteredRegistrants, setFilteredRegistrants] = useState<Registrant[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('Semua');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [isDataLoading, setIsDataLoading] = useState(false);

  const [activeTab, setActiveTab] = useState('registrants');
  const [selectedRegistrant, setSelectedRegistrant] = useState<Registrant | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [imgError, setImgError] = useState<Record<string, boolean>>({});

  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [galleryLoading, setGalleryLoading] = useState(false);
  const [newGalleryItem, setNewGalleryItem] = useState({ title: '', category: 'Semua', image_url: '', is_featured: false });

  const [videoItems, setVideoItems] = useState<VideoItem[]>([]);
  const [newVideoItem, setNewVideoItem] = useState({ title: '', duration: '', thumbnail_url: '', embed_url: '', display_order: 0 });

  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [newNewsItem, setNewNewsItem] = useState({ source_name: 'Wartain.com', badge_text: 'Liputan Khusus', title: '', quote: '', content: '', image_url: '', link_url: '', is_active: true });
  const [editingNews, setEditingNews] = useState<NewsItem | null>(null);

  const [facilityItems, setFacilityItems] = useState<FacilityItem[]>([]);
  const [newFacilityItem, setNewFacilityItem] = useState({ title: '', description: '', image_url: '', icon_name: 'Building2', display_order: 0 });
  const [editingFacility, setEditingFacility] = useState<FacilityItem | null>(null);

  const [studentWorks, setStudentWorks] = useState<StudentWork[]>([]);
  const [newStudentWork, setNewStudentWork] = useState({ title: '', student_name: '', category: 'Prestasi', description: '', content: '', image_url: '', images: [] as string[] });
  const [editingStudentWork, setEditingStudentWork] = useState<StudentWork | null>(null);

  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [profilesLoading, setProfilesLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const [stats, setStats] = useState({
    total: 0,
    laki: 0,
    perempuan: 0,
    mukim: 0,
    totalDana: 0
  });

  const checkUser = useCallback(async () => {
    setIsLoading(true);
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', session.user.id)
        .single();

      if (!error && profile) {
        setIsAdmin(true);
        setUserRole(profile.role);
      } else {
        await supabase.auth.signOut();
        setIsAdmin(false);
      }
    } else {
      setIsAdmin(false);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    checkUser();
  }, [checkUser]);

  useEffect(() => {
    if (userRole === 'content_admin' && activeTab === 'registrants') {
      setActiveTab('gallery');
    } else if (userRole === 'psb_admin' && activeTab !== 'registrants') {
      setActiveTab('registrants');
    }
  }, [userRole, activeTab]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoginLoading(true);
    setLoginError(null);
    const { data, error } = await supabase.auth.signInWithPassword({
      email: emailInput,
      password: passwordInput,
    });

    if (error) {
      setLoginError(error.message);
    } else if (data.user) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', data.user.id)
        .single();

      if (profile) {
        setIsAdmin(true);
        setUserRole(profile.role);
        if (profile.role === 'content_admin') setActiveTab('gallery');
      }
    }
    setIsLoginLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsAdmin(false);
  };

  const fetchRegistrants = async () => {
    setIsDataLoading(true);
    try {
      const response = await fetch(`${SCRIPT_URL}?action=get_registrants`);
      const result = await response.json();
      if (result.status === 'success') {
        const sortedData = [...result.data].sort((a, b) => {
          const nameA = String(a.Nama_Santri_Baru || '').toUpperCase();
          const nameB = String(b.Nama_Santri_Baru || '').toUpperCase();
          return nameA.localeCompare(nameB);
        });
        setRegistrants(sortedData);
        calculateStats(sortedData);
      }
    } catch (error) {
      console.error('Error fetching registrants:', error);
    }
    setIsDataLoading(false);
  };

  const calculateStats = (data: Registrant[]) => {
    const total = data.length;
    const laki = data.filter(r => r.Jenis_Kelamin === 'Laki-Laki').length;
    const perempuan = data.filter(r => r.Jenis_Kelamin === 'Perempuan').length;
    const mukim = data.filter(r => String(r.Masuk_Ke_Jenjang).toLowerCase().includes('mukim')).length;
    
    const totalDana = data.reduce((acc, curr) => {
      if (curr.File_Bukti_Bayar) {
        if (curr.Nominal_Bayar) {
          const val = typeof curr.Nominal_Bayar === 'number' ? curr.Nominal_Bayar : parseInt(String(curr.Nominal_Bayar).replace(/[^0-9]/g, '')) || 0;
          return acc + val;
        } else {
          const nominalStr = String(curr.Pilihan_Fasilitas || '').match(/\d+/g)?.join('') || '0';
          return acc + parseInt(nominalStr);
        }
      }
      return acc;
    }, 0);

    setStats({ total, laki, perempuan, mukim, totalDana });
  };

  const fetchGallery = async () => {
    setGalleryLoading(true);
    const { data } = await supabase.from('gallery').select('*').order('created_at', { ascending: false });
    if (data) setGalleryItems(data);
    setGalleryLoading(false);
  };

  const fetchVideos = async () => {
    const { data } = await supabase.from('videos').select('*').order('display_order', { ascending: true });
    if (data) setVideoItems(data);
  };

  const fetchNews = async () => {
    const { data } = await supabase.from('news').select('*').order('created_at', { ascending: false });
    if (data) setNewsItems(data);
  };

  const fetchFacilities = async () => {
    const { data } = await supabase.from('facilities').select('*').order('display_order', { ascending: true });
    if (data) setFacilityItems(data);
  };

  const fetchStudentWorks = async () => {
    const { data } = await supabase.from('student_works').select('*').order('created_at', { ascending: false });
    if (data) setStudentWorks(data);
  };

  const fetchProfiles = async () => {
    setProfilesLoading(true);
    const { data } = await supabase.from('profiles').select('*');
    if (data) setProfiles(data);
    setProfilesLoading(false);
  };

  const fetchData = useCallback(() => {
    if (userRole === 'super_admin' || userRole === 'psb_admin') fetchRegistrants();
    if (userRole === 'super_admin' || userRole === 'content_admin') {
      fetchGallery();
      fetchVideos();
      fetchNews();
      fetchFacilities();
      fetchStudentWorks();
    }
    if (userRole === 'super_admin') fetchProfiles();
  }, [userRole]);

  useEffect(() => {
    if (isAdmin) fetchData();
  }, [isAdmin, userRole, fetchData]);

  useEffect(() => {
    let filtered = [...registrants];
    if (filterCategory !== 'Semua') {
      filtered = filtered.filter(r => String(r.Masuk_Ke_Jenjang || '').toLowerCase().includes(filterCategory.toLowerCase()));
    }
    if (searchTerm) {
      filtered = filtered.filter(r =>
        String(r.Nama_Santri_Baru).toLowerCase().includes(searchTerm.toLowerCase()) ||
        String(r.Asal_Sekolah).toLowerCase().includes(searchTerm.toLowerCase()) ||
        String(r.NISN).toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setFilteredRegistrants(filtered);
  }, [searchTerm, filterCategory, registrants]);

  const handleFileUpload = async (file: File, path: string) => {
    setIsUploading(true);
    try {
      // Kompresi gambar sebelum upload (max width 1200px, quality 0.8)
      const compressedBlob = await compressImage(file, 1200, 0.8);
      const compressedFile = new File([compressedBlob], file.name, { type: 'image/jpeg' });

      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `${path}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('uploads')
        .upload(filePath, compressedFile);

      if (uploadError) {
        console.error('Error uploading file:', uploadError);
        alert('Gagal mengunggah gambar: ' + uploadError.message);
        setIsUploading(false);
        return null;
      }

      const { data: { publicUrl } } = supabase.storage
        .from('uploads')
        .getPublicUrl(filePath);

      setIsUploading(false);
      return publicUrl;
    } catch (err) {
      console.error('Error during image compression/upload:', err);
      // Fallback: upload original if compression fails
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `${path}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('uploads')
        .upload(filePath, file);

      if (uploadError) {
        alert('Gagal mengunggah gambar: ' + uploadError.message);
        setIsUploading(false);
        return null;
      }

      const { data: { publicUrl } } = supabase.storage
        .from('uploads')
        .getPublicUrl(filePath);

      setIsUploading(false);
      return publicUrl;
    }
  };

  const handleAddGalleryItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGalleryItem.title || !newGalleryItem.image_url) return;
    const { error } = await supabase.from('gallery').insert([newGalleryItem]);
    if (!error) {
      setNewGalleryItem({ title: '', category: 'Semua', image_url: '', is_featured: false });
      fetchGallery();
      alert('Foto berhasil ditambahkan ke galeri!');
    } else {
      alert('Gagal menambahkan foto: ' + error.message);
    }
  };

  const handleDeleteGalleryItem = async (id: string) => {
    if (confirm('Hapus foto ini?')) {
      const { error } = await supabase.from('gallery').delete().eq('id', id);
      if (!error) {
        fetchGallery();
        alert('Foto berhasil dihapus!');
      } else {
        alert('Gagal menghapus foto: ' + error.message);
      }
    }
  };

  const handleAddVideoItem = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.from('videos').insert([newVideoItem]);
    if (!error) {
      setNewVideoItem({ title: '', duration: '', thumbnail_url: '', embed_url: '', display_order: 0 });
      fetchVideos();
      alert('Video berhasil ditambahkan!');
    } else {
      alert('Gagal menambahkan video: ' + error.message);
    }
  };

  const handleDeleteVideoItem = async (id: string) => {
    if (confirm('Hapus video ini?')) {
      const { error } = await supabase.from('videos').delete().eq('id', id);
      if (!error) {
        fetchVideos();
        alert('Video berhasil dihapus!');
      } else {
        alert('Gagal menghapus video: ' + error.message);
      }
    }
  };

  const handleAddNewsItem = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.from('news').insert([newNewsItem]);
    if (!error) {
      setNewNewsItem({ source_name: 'Wartain.com', badge_text: 'Liputan Khusus', title: '', quote: '', content: '', image_url: '', link_url: '', is_active: true });
      fetchNews();
      alert('Berita berhasil ditambahkan!');
    } else {
      alert('Gagal menambahkan berita: ' + error.message);
    }
  };

  const handleUpdateNewsItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingNews) return;
    const { error } = await supabase.from('news').update(newNewsItem).eq('id', editingNews.id);
    if (!error) {
      setEditingNews(null);
      setNewNewsItem({ source_name: 'Wartain.com', badge_text: 'Liputan Khusus', title: '', quote: '', content: '', image_url: '', link_url: '', is_active: true });
      fetchNews();
      alert('Berita berhasil diperbarui!');
    } else {
      alert('Gagal memperbarui berita: ' + error.message);
    }
  };

  const handleEditNews = (item: NewsItem) => {
    setEditingNews(item);
    setNewNewsItem({
      source_name: item.source_name,
      badge_text: item.badge_text,
      title: item.title,
      quote: item.quote,
      content: item.content,
      image_url: item.image_url,
      link_url: item.link_url,
      is_active: item.is_active
    });
  };

  const handleDeleteNewsItem = async (id: string) => {
    if (confirm('Hapus berita ini?')) {
      const { error } = await supabase.from('news').delete().eq('id', id);
      if (!error) {
        fetchNews();
        alert('Berita berhasil dihapus!');
      } else {
        alert('Gagal menghapus berita: ' + error.message);
      }
    }
  };

  const handleAddFacilityItem = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.from('facilities').insert([newFacilityItem]);
    if (!error) {
      setNewFacilityItem({ title: '', description: '', image_url: '', icon_name: 'Building2', display_order: 0 });
      fetchFacilities();
      alert('Fasilitas berhasil ditambahkan!');
    } else {
      alert('Gagal menambahkan fasilitas: ' + error.message);
    }
  };

  const handleUpdateFacilityItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingFacility) return;
    const { error } = await supabase.from('facilities').update(newFacilityItem).eq('id', editingFacility.id);
    if (!error) {
      setEditingFacility(null);
      setNewFacilityItem({ title: '', description: '', image_url: '', icon_name: 'Building2', display_order: 0 });
      fetchFacilities();
      alert('Fasilitas berhasil diperbarui!');
    } else {
      alert('Gagal memperbarui fasilitas: ' + error.message);
    }
  };

  const handleEditFacility = (item: FacilityItem) => {
    setEditingFacility(item);
    setNewFacilityItem({
      title: item.title,
      description: item.description,
      image_url: item.image_url,
      icon_name: item.icon_name,
      display_order: item.display_order
    });
  };

  const handleDeleteFacilityItem = async (id: string) => {
    if (confirm('Hapus fasilitas ini?')) {
      const { error } = await supabase.from('facilities').delete().eq('id', id);
      if (!error) {
        fetchFacilities();
        alert('Fasilitas berhasil dihapus!');
      } else {
        alert('Gagal menghapus fasilitas: ' + error.message);
      }
    }
  };

  const handleAddStudentWork = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.from('student_works').insert([newStudentWork]);
    if (!error) {
      setNewStudentWork({ title: '', student_name: '', category: 'Prestasi', description: '', content: '', image_url: '', images: [] });
      fetchStudentWorks();
      alert('Karya santri berhasil ditambahkan!');
    } else {
      alert('Gagal menambahkan karya: ' + error.message);
    }
  };

  const handleUpdateStudentWorkItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingStudentWork) return;
    const { error } = await supabase.from('student_works').update(newStudentWork).eq('id', editingStudentWork.id);
    if (!error) {
      setEditingStudentWork(null);
      setNewStudentWork({ title: '', student_name: '', category: 'Prestasi', description: '', content: '', image_url: '', images: [] });
      fetchStudentWorks();
      alert('Karya santri berhasil diperbarui!');
    } else {
      alert('Gagal memperbarui karya: ' + error.message);
    }
  };

  const handleEditStudentWork = (item: StudentWork) => {
    setEditingStudentWork(item);
    setNewStudentWork({
      title: item.title,
      student_name: item.student_name,
      category: item.category,
      description: item.description,
      content: item.content || '',
      image_url: item.image_url,
      images: item.images || []
    });
  };

  const handleDeleteStudentWork = async (id: string) => {
    if (confirm('Hapus karya ini?')) {
      const { error } = await supabase.from('student_works').delete().eq('id', id);
      if (!error) {
        fetchStudentWorks();
        alert('Karya santri berhasil dihapus!');
      } else {
        alert('Gagal menghapus karya: ' + error.message);
      }
    }
  };

  const handleChangeRole = async (profileId: string, newRole: string) => {
    const { error } = await supabase
      .from('profiles')
      .update({ role: newRole })
      .eq('id', profileId);

    if (!error) {
      fetchProfiles();
      alert('Role berhasil diperbarui');
    } else {
      alert('Gagal memperbarui role: ' + error.message);
    }
  };

  const getYoutubeThumbnail = (url: string) => {
    let videoId = '';
    if (url.includes('youtube.com/embed/')) {
      videoId = url.split('embed/')[1]?.split('?')[0];
    } else if (url.includes('youtu.be/')) {
      videoId = url.split('youtu.be/')[1]?.split('?')[0];
    } else if (url.includes('v=')) {
      videoId = url.split('v=')[1]?.split('&')[0];
    }
    return videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : null;
  };

  const getSafeImageUrl = (url: string) => {
    if (!url) return '';
    if (url.includes('drive.google.com')) {
      const id = url.split('id=')[1] || url.split('/d/')[1]?.split('/')[0];
      return id ? `https://lh3.googleusercontent.com/d/${id}=s1000?authuser=0` : url;
    }
    return url;
  };

  return {
    isAdmin, userRole, isLoading, isLoginLoading, emailInput, setEmailInput, passwordInput, setPasswordInput, loginError,
    registrants, filteredRegistrants, searchTerm, setSearchTerm, filterCategory, setFilterCategory, currentPage, setCurrentPage, itemsPerPage, isDataLoading,
    activeTab, setActiveTab, selectedRegistrant, setSelectedRegistrant, showDetailModal, setShowDetailModal, imgError, setImgError,
    galleryItems, galleryLoading, newGalleryItem, setNewGalleryItem,
    videoItems, newVideoItem, setNewVideoItem,
    newsItems, newNewsItem, setNewNewsItem, editingNews, setEditingNews,
    facilityItems, newFacilityItem, setNewFacilityItem, editingFacility, setEditingFacility,
    studentWorks, newStudentWork, setNewStudentWork, editingStudentWork, setEditingStudentWork,
    profiles, profilesLoading, isUploading,
    stats,
    handleLogin, handleLogout, fetchData, handleFileUpload,
    handleAddGalleryItem, handleDeleteGalleryItem,
    handleAddVideoItem, handleDeleteVideoItem,
    handleAddNewsItem, handleUpdateNewsItem, handleEditNews, handleDeleteNewsItem,
    handleAddFacilityItem, handleUpdateFacilityItem, handleEditFacility, handleDeleteFacilityItem,
    handleAddStudentWork, handleUpdateStudentWorkItem, handleEditStudentWork, handleDeleteStudentWork,
    handleChangeRole, getYoutubeThumbnail, getSafeImageUrl
  };
};
