export const TYPE_STYLES = {
  prayer: { bg: 'rgba(66,153,225,0.12)',  border: '#4299e1', color: '#4299e1', label: 'PRAYER' },
  dhikr:  { bg: 'rgba(72,187,120,0.12)',  border: '#48bb78', color: '#48bb78', label: 'DHIKR'  },
  quran:  { bg: 'rgba(237,137,54,0.12)',  border: '#ed8936', color: '#ed8936', label: 'QURAN'  },
  dua:    { bg: 'rgba(159,122,234,0.12)', border: '#9f7aea', color: '#9f7aea', label: 'DUA'    },
  deed:   { bg: 'rgba(245,101,101,0.12)', border: '#f56565', color: '#f56565', label: 'DEED'   },
  prep:   { bg: 'rgba(150,150,150,0.07)', border: '#888',    color: '#888',    label: 'PREP'   },
};

export const DEFAULT_SCHEDULE = [
  {
    id: 'b0', time: '~3:30 AM', period: 'Tahajjud', icon: '🌙',
    tag: 'Last third of night', prayerTime: '03:30',
    hadith: 'Our Lord descends to the lowest heaven each night and says: Who calls upon Me that I may answer?',
    hadithSrc: 'Bukhari & Muslim',
    items: [
      { id: 'b0i0', name: 'Wake up & make Wudu', type: 'prep', duration: '5 min', detail: '' },
      { id: 'b0i1', name: 'Tahajjud Prayer', detail: "8 raka'at — 2 by 2", type: 'prayer', duration: '20–30 min' },
      { id: 'b0i2', name: "Long Sujood & Du'a", detail: 'Pour your heart to Allah', type: 'dua', duration: '10 min' },
      { id: 'b0i3', name: 'Sayyid Al-Istighfar', detail: 'أَسْتَغْفِرُ اللهَ الْعَظِيمَ', type: 'dhikr', duration: '5 min' },
      { id: 'b0i4', name: 'Witr Prayer', detail: "1 or 3 raka'at — closes night prayer", type: 'prayer', duration: '5 min' },
    ],
  },
  {
    id: 'b1', time: '~5:00 AM', period: 'Fajr', icon: '🌅',
    tag: 'Dawn', prayerTime: '05:00',
    hadith: 'Whoever prays Fajr is under the protection of Allah.',
    hadithSrc: 'Muslim',
    items: [
      { id: 'b1i0', name: 'Sunnah Fajr', detail: "2 raka'at before Fard", type: 'prayer', duration: '5 min' },
      { id: 'b1i1', name: 'Fajr Fard Prayer', detail: "2 raka'at", type: 'prayer', duration: '5 min' },
      { id: 'b1i2', name: 'Morning Adhkar', detail: 'SubhanAllah ×33 · Alhamdulillah ×33 · Allahu Akbar ×34', type: 'dhikr', duration: '10 min' },
      { id: 'b1i3', name: 'Ayatul Kursi', detail: 'After every Fard prayer', type: 'quran', duration: '2 min' },
      { id: 'b1i4', name: 'Quran Recitation', detail: 'At least 1 page', type: 'quran', duration: '15 min' },
    ],
  },
  {
    id: 'b2', time: '~8:00 AM', period: 'Duha', icon: '☀️',
    tag: 'Mid morning', prayerTime: '08:00',
    hadith: "Whoever prays Duha with 2 raka'at will not be written among the heedless.",
    hadithSrc: 'Tabarani',
    items: [
      { id: 'b2i0', name: 'Duha Prayer', detail: "2–8 raka'at after sunrise", type: 'prayer', duration: '10–15 min' },
      { id: 'b2i1', name: 'Istighfar', detail: 'أَسْتَغْفِرُ اللهَ × 100', type: 'dhikr', duration: '5 min' },
      { id: 'b2i2', name: 'Sadaqah', detail: 'Give charity — even a smile counts', type: 'deed', duration: 'anytime' },
    ],
  },
  {
    id: 'b3', time: '~12:30 PM', period: 'Dhuhr', icon: '🕛',
    tag: 'Midday', prayerTime: '12:30',
    hadith: 'The gates of heaven are opened at midday and do not close until Dhuhr prayer is performed.',
    hadithSrc: 'Abu Dawud',
    items: [
      { id: 'b3i0', name: 'Sunnah Dhuhr', detail: "4 raka'at before Fard", type: 'prayer', duration: '10 min' },
      { id: 'b3i1', name: 'Dhuhr Fard Prayer', detail: "4 raka'at", type: 'prayer', duration: '10 min' },
      { id: 'b3i2', name: 'Sunnah after Dhuhr', detail: "2 raka'at", type: 'prayer', duration: '5 min' },
      { id: 'b3i3', name: 'Salawat on Prophet ﷺ', detail: 'اللَّهُمَّ صَلِّ عَلَى سَيِّدِنَا مُحَمَّدٍ وَبَارِكْ وَسَلِّمْ', type: 'dhikr', duration: '5 min' },
    ],
  },
  {
    id: 'b4', time: '~3:45 PM', period: 'Asr', icon: '🕓',
    tag: 'Afternoon', prayerTime: '15:45',
    hadith: 'Whoever misses Asr prayer, it is as if he has lost his family and wealth.',
    hadithSrc: 'Bukhari',
    items: [
      { id: 'b4i0', name: 'Asr Fard Prayer', detail: "4 raka'at", type: 'prayer', duration: '10 min' },
      { id: 'b4i1', name: 'Evening Adhkar', detail: 'Dhikr & protection duas', type: 'dhikr', duration: '10 min' },
      { id: 'b4i2', name: 'Quran Recitation', detail: 'Continue your daily portion', type: 'quran', duration: '15 min' },
      { id: 'b4i3', name: "Du'a", detail: 'Special accepted hour — before Maghrib', type: 'dua', duration: '10 min' },
    ],
  },
  {
    id: 'b5', time: '~6:30 PM', period: 'Maghrib', icon: '🌇',
    tag: 'Sunset', prayerTime: '18:30',
    hadith: "Make du'a at sunset — the du'a of the fasting person is not rejected.",
    hadithSrc: 'Ibn Majah',
    items: [
      { id: 'b5i0', name: 'Maghrib Fard Prayer', detail: "3 raka'at", type: 'prayer', duration: '8 min' },
      { id: 'b5i1', name: 'Sunnah Maghrib', detail: "2 raka'at", type: 'prayer', duration: '5 min' },
      { id: 'b5i2', name: 'Surah Al-Mulk', detail: 'Protects from punishment of the grave', type: 'quran', duration: '10 min' },
      { id: 'b5i3', name: 'Family & good deeds', detail: 'Be kind, connect with loved ones', type: 'deed', duration: 'evening' },
    ],
  },
  {
    id: 'b6', time: '~8:00 PM', period: 'Isha', icon: '🌃',
    tag: 'Night', prayerTime: '20:00',
    hadith: 'Whoever prays Isha in congregation it is as if he has prayed half the night.',
    hadithSrc: 'Muslim',
    items: [
      { id: 'b6i0', name: 'Isha Fard Prayer', detail: "4 raka'at", type: 'prayer', duration: '10 min' },
      { id: 'b6i1', name: 'Sunnah Isha', detail: "2 raka'at", type: 'prayer', duration: '5 min' },
      { id: 'b6i2', name: 'Witr Prayer', detail: "1–3 raka'at — do not sleep without it", type: 'prayer', duration: '5 min' },
      { id: 'b6i3', name: 'Before sleep routine', detail: 'Ayatul Kursi + 3 Quls ×3 + Tasbih ×100', type: 'dhikr', duration: '10 min' },
      { id: 'b6i4', name: 'Sleep with Wudu', detail: 'Sleep early to wake for Tahajjud', type: 'prep', duration: '' },
    ],
  },
];
