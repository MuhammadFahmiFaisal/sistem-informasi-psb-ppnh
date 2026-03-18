/**
 * Constants and static data for registration
 */

export const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwwEMQPqONvJPGmRtuSQQUPzjGSjXgpwNRBPQvD5HQkTwhKZ_Rd4vwqHJgrgSkAZyXTBg/exec";

export const JENJANG_OPTIONS = [
  { value: "SMP PLUS NURUL HUDA (MUKIM DOMISI SEKITAR)", label: "SMP Plus Nurul Huda – Mukim (Domisili Sekitar)" },
  { value: "SMP PLUS NURUL HUDA (MUKIM DOMISI EKSTERNAL)", label: "SMP Plus Nurul Huda – Mukim (Domisili Luar)" },
  { value: "SMK PLUS NURUL HUDA (MUKIM DOMISI SEKITAR)", label: "SMK Plus Nurul Huda – Mukim (Domisili Sekitar)" },
  { value: "SMK PLUS NURUL HUDA (MUKIM DOMISI EKSTERNAL)", label: "SMK Plus Nurul Huda – Mukim (Domisili Luar)" },
  { value: "SMP PLUS NURUL HUDA (ANSOR)", label: "SMP Plus Nurul Huda - Ansor" },
  { value: "SMK PLUS NURUL HUDA (ANSOR)", label: "SMK Plus Nurul Huda - Ansor" }
];

export const INCOME_OPTIONS = [
  "Kurang dari Rp. 1.100.000",
  "Rp. 1.100.000 - Rp. 2.100.000",
  "Rp. 2.100.000 - Rp. 3.500.000",
  "Lebih dari Rp. 3.500.000"
];

export const getSPPOptionsByIncome = (income: string) => {
  switch (income) {
    case "Kurang dari Rp. 1.100.000":
      return [{ label: "Rp. 100.000 (SKTM)", value: 100000 }];
    case "Rp. 1.100.000 - Rp. 2.100.000":
      return [{ label: "Rp. 150.000 (Proporsional)", value: 150000 }];
    case "Rp. 2.100.000 - Rp. 3.500.000":
      return [{ label: "Rp. 215.000 (SPP Dasar)", value: 215000 }];
    case "Lebih dari Rp. 3.500.000":
      return [{ label: "Rp. 250.000 (Kontribusi)", value: 250000 }];
    default:
      return [];
  }
};

export const FASILITAS_OPTIONS = [
  { value: "Bulanan - Rp. 75.000", label: "Bulanan: Rp 75.000", amount: 75000, isMonthly: true },
  { value: "Per Semester - Rp. 400.000", label: "Per Semester: Rp 400.000 (Hemat)", amount: 400000, isMonthly: false },
  { value: "Per Tahun - Rp. 800.000", label: "Per Tahun: Rp 800.000 (Prioritas)", amount: 800000, isMonthly: false },
  { value: "Per Tiga Tahun - Rp. 2.400.000", label: "Per 3 Tahun: Rp 2.400.000 (Komitmen)", amount: 2400000, isMonthly: false }
];
