-- ==============================================================================
-- BRAHMA KUMARIS SPIRITUAL PORTAL & DIVINE ART GALLERY DATABASE
-- Run this in your Supabase Dashboard: SQL Editor -> New Query -> Run
-- ==============================================================================

-- 1. Site Settings (Editable via Admin Page)
create table if not exists public.site_settings (
  key text primary key,
  value text not null,
  updated_at timestamptz default now()
);

alter table public.site_settings enable row level security;
create policy "Allow public read site_settings" on public.site_settings for select to anon using (true);
create policy "Allow public insert site_settings" on public.site_settings for insert to anon with check (true);
create policy "Allow public update site_settings" on public.site_settings for update to anon using (true);

-- Insert initial settings
insert into public.site_settings (key, value) values
  ('site_title', 'Brahma Kumaris - Spiritual Wisdom & Meditation'),
  ('site_tagline', 'Rediscover Your True Self through Raja Yoga & Spiritual Wisdom'),
  ('youtube_url', 'https://www.youtube.com/@BrahmaKumaris'),
  ('instagram_url', 'https://www.instagram.com/brahmakumaris'),
  ('facebook_url', 'https://www.facebook.com/brahmakumaris'),
  ('contact_email', 'contact@brahmakumaris.org'),
  ('contact_phone', '+91 98765 43210'),
  ('center_address', 'Pandav Bhawan, Mount Abu, Rajasthan, India'),
  ('admin_password', 'omshanti2026')
on conflict (key) do nothing;


-- 2. Divine Art Gallery Guide Exhibitions (10 Sacred Exhibits)
create table if not exists public.exhibitions (
  id serial primary key,
  order_num int not null,
  title_en text not null,
  title_hi text not null,
  desc_en text not null,
  desc_hi text not null,
  image_url text not null,
  audio_url_en text,
  audio_url_hi text,
  created_at timestamptz default now()
);

alter table public.exhibitions enable row level security;
create policy "Allow public read exhibitions" on public.exhibitions for select to anon using (true);
create policy "Allow public insert exhibitions" on public.exhibitions for insert to anon with check (true);
create policy "Allow public update exhibitions" on public.exhibitions for update to anon using (true);
create policy "Allow public delete exhibitions" on public.exhibitions for delete to anon using (true);

-- Seed the 10 Sacred Exhibition Guides (with Hindi & English)
insert into public.exhibitions (order_num, title_en, title_hi, desc_en, desc_hi, image_url) values
(
  1,
  'Trimurti Shiva - Supreme Soul God Father',
  'त्रिमूर्ति शिव - परमपिता परमात्मा',
  'Shiv Baba is the incorporeal Supreme Soul, a radiant point of divine light (Jyotirlingam). He is the Creator of the three subtle deities: Brahma (Generation), Vishnu (Sustenance), and Shankar (Transformation). Through Brahma, He reveals divine knowledge to transform Kaliyug into Satyug.',
  'परमपिता परमात्मा शिव अशरीरी, ज्योतिर्बिंदु स्वरूप हैं। वे त्रिमूर्ति—ब्रह्मा, विष्णु और शंकर के रचयिता हैं। ब्रह्मा द्वारा वे सत्य ज्ञान देकर कलियुग को पुनः सत्युग में परिवर्तित करते हैं। वे शांति, प्रेम और आनंद के असीम सागर हैं।',
  'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1000&q=80'
),
(
  2,
  'The World Drama Wheel (Kalpa Chakra)',
  'सृष्टि चक्र - अनादि अविनाशी नाटक',
  'The eternal World Drama lasts 5,000 years, divided equally into four ages: Golden Age (Satyug - 1250 yrs), Silver Age (Tretayug - 1250 yrs), Copper Age (Dvaparyug - 1250 yrs), and Iron Age (Kaliyug - 1250 yrs). At the end comes the Confluence Age (Sangam Yug), where God descends to usher in the new golden dawn.',
  'सृष्टि चक्र 5000 वर्ष का एक अनादि अविनाशी चक्र है, जो चार युगों में समान रूप से बंटा है: सत्युग (स्वर्ण युग), त्रेतायुग (रजत युग), द्वापरयुग (ताम्र युग), और कलियुग (लौह युग)। अंत में संगमयुग आता है, जिसमें परमात्मा अवतरित होकर पतित दुनिया को पावन बनाते हैं।',
  'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1000&q=80'
),
(
  3,
  'The World Genealogical Tree (Kalpa Vriksha)',
  'कल्प वृक्ष - मानव सृष्टि का विशाल वृक्ष',
  'The Kalpa Vriksha depicts the family tree of human souls and diverse world religions. The Supreme Soul is the Eternal Seed at the top. The roots represent the primordial deity religion. Over time, branches sprout representing major world faiths—Buddhism, Christianity, Islam, and other spiritual paths.',
  'कल्प वृक्ष मानव आत्माओं और सभी धर्मों का पारिवारिक वृक्ष है। इसके ऊपर बीज रूप परमात्मा शिव विराजमान हैं। मूल तना आदि सनातन देवी-देवता धर्म है। समय के साथ विभिन्न मुख्य शाखाएं—बौद्ध, ईसाई, इस्लाम और अन्य पंथ—उत्पन्न होती हैं।',
  'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1000&q=80'
),
(
  4,
  'The Ladder of 84 Births',
  'चौरासी जन्मों की सीढ़ी',
  'This picture shows the soul journey through the cycle of 84 births. In the Golden Age, souls experience peak purity and joy (100% happiness, 0% sorrow). As the soul descends through the ages, it loses spiritual energy until it reaches the depths of Kaliyug, where God lifts it back to purity.',
  'यह चित्र आत्मा की 84 जन्मों की यात्रा को दर्शाता है। सत्युग में आत्मा पूर्ण पावन 16 कला संपूर्ण होती है। जन्म-मरण के चक्र में आते-आते द्वापर और कलियुग तक आत्मा की शक्ति क्षीण होती है। अंत में शिव बाबा आकर सीढ़ी के शीर्ष पर पुनः ले जाते हैं।',
  'https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&w=1000&q=80'
),
(
  5,
  'Soul and The Third Eye of Knowledge',
  'आत्मा और ज्ञान का तीसरा नेत्र',
  'You are not this perishable physical body; you are an eternal, sentient point of spiritual light situated between the eyebrows. The physical eyes see only matter, but the divine third eye granted by spiritual knowledge allows you to realize yourself as a peaceful soul and perceive God.',
  'आप यह नश्वर शरीर नहीं, बल्कि भृकुटी के मध्य विराजमान एक चैतन्य, अविनाशी ज्योतिर्बिंदु आत्मा हैं। स्थूल आंखें केवल भौतिक संसार देखती हैं, किंतु ज्ञान का तीसरा नेत्र आपको स्वयं का और परमात्मा का सच्चा साक्षात्कार कराता है।',
  'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1000&q=80'
),
(
  6,
  'Golden Age - The Kingdom of Peace & Harmony',
  'स्वर्णिम भारत - सत्युग की दिव्य दुनिया',
  'Satyug was an era of complete peace, purity, and prosperity on Earth (Heaven / Paradise). Shri Lakshmi and Shri Narayan were the sovereign rulers. Nature was completely benevolent, and all beings lived in divine harmony without any sorrow, sickness, or conflict.',
  'सत्युग धरती पर स्वर्ग का काल था, जहाँ संपूर्ण सुख, शांति, पवित्रता और समृद्धि थी। श्री लक्ष्मी और श्री नारायण का राज्य था। प्रकृति दासी समान अनुकूल थी और किसी भी प्राणी को कोई दुःख, रोग या भय नहीं था।',
  'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=1000&q=80'
),
(
  7,
  'The Three Worlds (Teen Lok)',
  'तीन लोक - साकार, सूक्ष्म और परमधाम',
  'The universe comprises three distinct realms: (1) Corporeal World (Sakar Lok) of matter, (2) Subtle World (Sukshma Lok) of angelic light, and (3) Incorporeal World (Paramdham / Nirvana / Shanti Dham), an ocean of golden-red light where all souls and God dwell in supreme silence.',
  'ब्रह्मांड तीन लोकों से बना है: (1) साकार लोक—जहाँ हम शरीर धारण कर कर्म करते हैं, (2) सूक्ष्म लोक—जहाँ ब्रह्मा, विष्णु और शंकर की प्रकाशमयी सूक्ष्म काया है, (3) परमधाम (शांतिधाम)—जहाँ लाल-सुनहरे प्रकाश में सभी आत्माएं और परमात्मा शिव परम शांति में रहते हैं।',
  'https://images.unsplash.com/photo-1507499739999-097706ad8914?auto=format&fit=crop&w=1000&q=80'
),
(
  8,
  'The Inviolable Law of Karma',
  'कर्मों की गुह्य गति',
  'Every thought, word, and action carries a spiritual reaction. As you sow, so shall you reap. Pure actions guided by soul consciousness bring boundless joy and peace, while actions driven by ego, anger, and attachment bring sorrow. Raja Yoga purifies our past karmic debt.',
  'जैसा कर्म करेंगे, वैसा ही फल प्राप्त होगा। देह-अभिमान, क्रोध, मोह व लोभ के वशीभूत होकर किए गए कर्म दुःख लाते हैं, जबकि आत्म-स्मृति और प्रेमभाव से किए कर्म सुख और शांति प्रदान करते हैं। राजयोग से पुराने पाप-कर्म भस्म होते हैं।',
  'https://images.unsplash.com/photo-1470240731273-7821a6eeb6bd?auto=format&fit=crop&w=1000&q=80'
),
(
  9,
  'Raja Yoga Meditation - Union with God',
  'सहज राजयोग - परमात्मा से मिलन',
  'Raja Yoga is not physical posturing, but a mental communion between the soul and the Supreme Soul. By sitting quietly and focusing mind and intellect on Shiv Baba in Paramdham, one receives divine energy, peace, pure love, and spiritual power.',
  'राजयोग कोई शारीरिक व्यायाम नहीं, बल्कि आत्मा का परमात्मा से मन और बुद्धि द्वारा सच्चा संबंध है। शांत बैठकर अपने मन को परमधाम में शिव बाबा से जोड़ने पर असीम शांति, दिव्य शक्ति, प्रेम और आनंद का प्रवाह आत्मा में भर जाता है।',
  'https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=1000&q=80'
),
(
  10,
  'The Confluence Age - Dawn of Spiritual Awakening',
  'कल्याणकारी संगमयुग - नया सवेरा',
  'The present time is the auspicious Sangam Yug—the transition period between the end of Kaliyug and the dawn of Satyug. It is the most elevated age where human beings have the unique fortune to receive God’s direct guidance and transform from ordinary humans into divine beings.',
  'वर्तमान समय वही मंगलकारी संगमयुग है—जब कलियुग की रात्रि समाप्त हो रही है और सत्युग का स्वर्णिम सवेरा होने वाला है। यह सबसे मूल्यवान समय है जब मनुष्य सीधे भगवान से ज्ञान लेकर नर से नारायण और नारी से श्री लक्ष्मी बन सकते हैं।',
  'https://images.unsplash.com/photo-1495616811223-4d98c6e9c869?auto=format&fit=crop&w=1000&q=80'
)
on conflict do nothing;


-- 3. Divine Art Gallery Items (Visual Artworks & Paintings)
create table if not exists public.gallery_items (
  id serial primary key,
  title text not null,
  category text default 'Spiritual Art',
  image_url text not null,
  description text,
  created_at timestamptz default now()
);

alter table public.gallery_items enable row level security;
create policy "Allow public read gallery_items" on public.gallery_items for select to anon using (true);
create policy "Allow public insert gallery_items" on public.gallery_items for insert to anon with check (true);
create policy "Allow public update gallery_items" on public.gallery_items for update to anon using (true);
create policy "Allow public delete gallery_items" on public.gallery_items for delete to anon using (true);

-- Seed Gallery
insert into public.gallery_items (title, category, image_url, description) values
('Radiant Light of Shiva', 'Spiritual Paintings', 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80', 'The incorporeal ocean of peace and benevolence.'),
('Peaceful Mind in Meditation', 'Meditation Art', 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80', 'A soul immersed in serenity and divine remembrance.'),
('The Golden Dawn of Satyug', 'Spiritual Vision', 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=800&q=80', 'Vision of harmony and prosperity in the new age.'),
('Celestial Nature & Purity', 'Nature & Divine', 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80', 'Pure vibrations healing human hearts and nature.')
on conflict do nothing;


-- 4. Events & Retreats
create table if not exists public.events (
  id serial primary key,
  title text not null,
  date_str text not null,
  time_str text,
  venue text not null,
  description text,
  status text default 'Upcoming',
  created_at timestamptz default now()
);

alter table public.events enable row level security;
create policy "Allow public read events" on public.events for select to anon using (true);
create policy "Allow public insert events" on public.events for insert to anon with check (true);
create policy "Allow public update events" on public.events for update to anon using (true);
create policy "Allow public delete events" on public.events for delete to anon using (true);

insert into public.events (title, date_str, time_str, venue, description) values
('7-Day Foundation Course in Raja Yoga Meditation', 'Every Monday - Sunday', '7:00 AM - 8:30 AM', 'Online & Local BK Centers', 'Learn the basics of soul consciousness, God connection, and mind mastery. Free of charge.'),
('World Peace Meditation Hour', 'Every Third Sunday', '6:30 PM - 7:30 PM', 'Global Centers & Live Stream', 'Join millions across 140 countries radiating pure vibrations of peace and healing to the world.'),
('Stress-Free Living Spiritual Retreat', 'Upcoming Weekend', 'Full Day (9 AM - 5 PM)', 'Peace Village Spiritual Park', 'Holistic self-empowerment workshop with meditation sessions, sattvic meals, and spiritual classes.')
on conflict do nothing;


-- 5. Visitor Responses, Prayers & Feedback
create table if not exists public.responses (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text,
  phone text,
  topic text default 'General',
  message text not null,
  created_at timestamptz default now()
);

alter table public.responses enable row level security;
create policy "Allow public insert responses" on public.responses for insert to anon with check (true);
create policy "Allow public read responses" on public.responses for select to anon using (true);
create policy "Allow public delete responses" on public.responses for delete to anon using (true);
