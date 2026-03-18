import React from 'react';
import { useAdminDashboard } from '../hooks/useAdminDashboard';

// Sub-components
import LoginView from './admin/LoginView';
import AdminHeader from './admin/AdminHeader';
import AdminNavTabs from './admin/AdminNavTabs';
import StatCards from './admin/StatCards';
import RegistrantsTable from './admin/RegistrantsTable';
import RegistrantDetailModal from './admin/RegistrantDetailModal';
import GalleryManager from './admin/GalleryManager';
import VideoManager from './admin/VideoManager';
import NewsManager from './admin/NewsManager';
import FacilityManager from './admin/FacilityManager';
import StudentWorksManager from './admin/StudentWorksManager';
import PrintView from './admin/PrintView';

const AdminDashboard: React.FC = () => {
  const {
    isAdmin, userRole, isLoading, isLoginLoading, emailInput, setEmailInput, passwordInput, setPasswordInput, loginError,
    filteredRegistrants, searchTerm, setSearchTerm, filterCategory, setFilterCategory, currentPage, setCurrentPage, itemsPerPage, isDataLoading,
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
  } = useAdminDashboard();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-navy-darker flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="text-white/50 font-bold tracking-widest text-xs uppercase">Authenticating...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <LoginView
        emailInput={emailInput}
        setEmailInput={setEmailInput}
        passwordInput={passwordInput}
        setPasswordInput={setPasswordInput}
        handleLogin={handleLogin}
        loginError={loginError}
        isLoginLoading={isLoginLoading}
      />
    );
  }

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <div className="min-h-screen bg-slate-50 dark:bg-navy-darker pb-20 no-scrollbar">
        {/* TOP BAR / NAVIGATION */}
        <div className="bg-navy-dark px-4 py-8 mb-8 no-print border-b border-white/5 shadow-2xl">
          <AdminHeader
            userRole={userRole}
            fetchData={fetchData}
            handleLogout={handleLogout}
          />

          <AdminNavTabs
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            userRole={userRole}
          />
        </div>

        {/* MAIN CONTENT AREA */}
        <div className="px-4 md:px-8">
          {/* STATS OVERVIEW (Only for PSB) */}
          {activeTab === 'registrants' && (userRole === 'super_admin' || userRole === 'psb_admin') && (
            <StatCards stats={stats} />
          )}

          {/* TAB CONTENTS */}
          {activeTab === 'registrants' && (userRole === 'super_admin' || userRole === 'psb_admin') && (
            <RegistrantsTable
              filteredRegistrants={filteredRegistrants}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              filterCategory={filterCategory}
              setFilterCategory={setFilterCategory}
              isDataLoading={isDataLoading}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              itemsPerPage={itemsPerPage}
              setSelectedRegistrant={setSelectedRegistrant}
              setImgError={setImgError}
              setShowDetailModal={setShowDetailModal}
            />
          )}

          {activeTab === 'gallery' && (userRole === 'super_admin' || userRole === 'content_admin') && (
            <GalleryManager
              galleryItems={galleryItems}
              newGalleryItem={newGalleryItem}
              setNewGalleryItem={setNewGalleryItem}
              handleFileUpload={handleFileUpload}
              handleAddGalleryItem={handleAddGalleryItem}
              handleDeleteGalleryItem={handleDeleteGalleryItem}
              isUploading={isUploading}
              galleryLoading={galleryLoading}
            />
          )}

          {activeTab === 'videos' && (userRole === 'super_admin' || userRole === 'content_admin') && (
            <VideoManager
              videoItems={videoItems}
              newVideoItem={newVideoItem}
              setNewVideoItem={setNewVideoItem}
              getYoutubeThumbnail={getYoutubeThumbnail}
              handleAddVideoItem={handleAddVideoItem}
              handleDeleteVideoItem={handleDeleteVideoItem}
            />
          )}

          {activeTab === 'news' && (userRole === 'super_admin' || userRole === 'content_admin') && (
            <NewsManager
              newsItems={newsItems}
              newNewsItem={newNewsItem}
              setNewNewsItem={setNewNewsItem}
              editingNews={editingNews}
              setEditingNews={setEditingNews}
              handleFileUpload={handleFileUpload}
              handleAddNewsItem={handleAddNewsItem}
              handleUpdateNewsItem={handleUpdateNewsItem}
              handleDeleteNewsItem={handleDeleteNewsItem}
              handleEditNews={handleEditNews}
              isUploading={isUploading}
            />
          )}

          {activeTab === 'facilities' && (userRole === 'super_admin' || userRole === 'content_admin') && (
            <FacilityManager
              facilityItems={facilityItems}
              newFacilityItem={newFacilityItem}
              setNewFacilityItem={setNewFacilityItem}
              editingFacility={editingFacility}
              setEditingFacility={setEditingFacility}
              handleFileUpload={handleFileUpload}
              handleAddFacilityItem={handleAddFacilityItem}
              handleUpdateFacilityItem={handleUpdateFacilityItem}
              handleDeleteFacilityItem={handleDeleteFacilityItem}
              handleEditFacility={handleEditFacility}
              isUploading={isUploading}
            />
          )}

          {activeTab === 'student_works' && (userRole === 'super_admin' || userRole === 'content_admin') && (
            <StudentWorksManager
              studentWorks={studentWorks}
              newStudentWork={newStudentWork}
              setNewStudentWork={setNewStudentWork}
              editingStudentWork={editingStudentWork}
              setEditingStudentWork={setEditingStudentWork}
              handleFileUpload={handleFileUpload}
              handleAddStudentWork={handleAddStudentWork}
              handleUpdateStudentWorkItem={handleUpdateStudentWorkItem}
              handleDeleteStudentWork={handleDeleteStudentWork}
              handleEditStudentWork={handleEditStudentWork}
              filterCategory={filterCategory}
              setFilterCategory={setFilterCategory}
              isUploading={isUploading}
            />
          )}
        </div>

        {/* MODAL DETAIL */}
        {selectedRegistrant && (
          <RegistrantDetailModal
            selectedRegistrant={selectedRegistrant}
            showDetailModal={showDetailModal}
            setShowDetailModal={setShowDetailModal}
            imgError={imgError}
            setImgError={setImgError}
            getSafeImageUrl={getSafeImageUrl}
            handlePrint={handlePrint}
          />
        )}

        {/* PRINT VIEW */}
        <PrintView selectedRegistrant={selectedRegistrant} />
      </div>
    </>
  );
};

export default AdminDashboard;
