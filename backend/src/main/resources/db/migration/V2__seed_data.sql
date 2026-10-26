-- V2: Seed initial book data
INSERT INTO books (
    title, subtitle, author_name, description, short_description,
    price, stock_quantity, pages, language, publication_year,
    cover_image_url, author_bio, author_achievements, table_of_contents, is_active
) VALUES (
    'Zamonaviy Pedagogika va Ta''lim Mahorati',
    'O''qituvchilar, murabbiylar va yosh mutaxassislar uchun amaliy qo''llanma',
    'Ustoz Nigora Rahimova',
    'Ushbu kitob 20 yillik pedagogik tajriba asosida yaratilgan bo''lib, zamonaviy dars berish usullari, o''quvchilar psixologiyasi, darsda interfaol metodlarni qo''llash hamda ta''lim jarayonida o''quvchilar qiziqishini oshirish yo''llarini chuqur yoritadi. Har bir bobda amaliy mashg''ulotlar, real dars ssenariylari va metodik tavsiyalar jamlangan bo''lib, bu kitob har bir o''qituvchining ish stolida turishi lozim bo''lgan qimmatli asardir.',
    '20 yillik tajribaga ega ustozdan ta''lim sifatini oshirish, o''quvchilar bilan to''g''ri muloqot va yangi davr metodikasi bo''yicha eng to''liq amaliy qo''llanma.',
    85000.00,
    150,
    280,
    'O''zbek tili',
    2024,
    'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
    'Nigora Rahimova — Xalq ta''limi a''lochisi, oliy toifali pedagog va metodist. 20 yildan ortiq pedagogik faoliyati davomida yuzlab o''qituvchilarga ustozlik qilgan, viloyat va respublika ochiq darslari hamda metodik anjumanlarida doimiy ma''ruzachi bo''lib kelmoqda.',
    '• Xalq ta''limi a''lochisi ko''krak nishoni sohibasi
• "Yilning eng yaxshi fidoiy o''qituvchisi" tanlovi g''olibi
• 50 dan ortiq ilmiy-metodik maqolalar muallifi
• Minglab o''quvchilar va shogirdlar ustozi',
    '1-bob. Yangi davr o''qituvchisining kasbiy ko''nikmalari va etikasi
2-bob. O''quvchilar diqqatini jalb qilish va motivatsiyani uyg''otish
3-bob. Darsda interfaol metodlar va zamonaviy texnologiyalardan foydalanish
4-bob. Turli xarakterdagi o''quvchilar bilan muloqot va nizolarni bartaraf etish
5-bob. Baholashning zamonaviy va adolatli mezonlari
6-bob. Ota-onalar bilan mustahkam hamkorlik o''rnatish sirlari
7-bob. O''qituvchining ruhiy xotirjamligi va kasbiy charchoqni yengish',
    TRUE
);
