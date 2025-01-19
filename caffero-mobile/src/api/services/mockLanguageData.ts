import { Language } from '../models/Language';
import { Localization } from '../models/Localization';

export const mockLanguages: Language[] = [
    {
        id: 'en',
        name: 'English'
    },
    {
        id: 'tr',
        name: 'Türkçe'
    }
];

type LocalizationMap = {
    [key: string]: Localization[];
};

export const mockLocalizations: LocalizationMap = {
    en: [
        // App Settings Screen
        { id: 1, propertyName: 'appSettings', value: 'App Settings', languageId: 'en' },
        { id: 2, propertyName: 'theme', value: 'Theme', languageId: 'en' },
        { id: 3, propertyName: 'darkMode', value: 'Dark Mode', languageId: 'en' },
        { id: 4, propertyName: 'language', value: 'Language', languageId: 'en' },
        { id: 5, propertyName: 'appInformation', value: 'App Information', languageId: 'en' },
        { id: 6, propertyName: 'version', value: 'Version', languageId: 'en' },
        { id: 7, propertyName: 'buildnumber', value: 'Build Number', languageId: 'en' },
        { id: 8, propertyName: 'environment', value: 'Environment', languageId: 'en' },
        { id: 9, propertyName: 'platform', value: 'Platform', languageId: 'en' },

        // Auth Screens
        { id: 10, propertyName: 'email', value: 'Email', languageId: 'en' },
        { id: 11, propertyName: 'password', value: 'Password', languageId: 'en' },
        { id: 12, propertyName: 'username', value: 'Username', languageId: 'en' },
        { id: 13, propertyName: 'login', value: 'Login', languageId: 'en' },
        { id: 14, propertyName: 'register', value: 'Register', languageId: 'en' },
        { id: 15, propertyName: 'loginFailed', value: 'Login failed. Please try again.', languageId: 'en' },
        { id: 16, propertyName: 'registrationFailed', value: 'Registration failed. Please try again.', languageId: 'en' },
        { id: 17, propertyName: 'noAccountRegister', value: "Don't have an account? Register", languageId: 'en' },
        { id: 18, propertyName: 'haveAccountLogin', value: 'Already have an account? Login', languageId: 'en' },

        // Equipment Screens
        { id: 19, propertyName: 'equipmentDetails', value: 'Equipment Details', languageId: 'en' },
        { id: 20, propertyName: 'description', value: 'Description', languageId: 'en' },
        { id: 21, propertyName: 'specifications', value: 'Specifications', languageId: 'en' },
        { id: 22, propertyName: 'equipmentKind', value: 'Equipment Kind', languageId: 'en' },
        { id: 23, propertyName: 'equipmentType', value: 'Equipment Type', languageId: 'en' },
        { id: 24, propertyName: 'addProductImage', value: 'Add Product Image', languageId: 'en' },

        // Recipe Screen
        { id: 25, propertyName: 'equipment', value: 'Equipment', languageId: 'en' },
        { id: 26, propertyName: 'coffee', value: 'Coffee', languageId: 'en' },
        { id: 27, propertyName: 'amount', value: 'Amount', languageId: 'en' },
        { id: 28, propertyName: 'milk', value: 'Milk', languageId: 'en' },
        { id: 29, propertyName: 'volume', value: 'Volume', languageId: 'en' },
        { id: 30, propertyName: 'temperature', value: 'Temperature', languageId: 'en' },

        // Premium Screen
        { id: 31, propertyName: 'premium', value: 'Premium', languageId: 'en' },
        { id: 32, propertyName: 'exclusiveCoupons', value: 'Exclusive Coupons', languageId: 'en' },
        { id: 33, propertyName: 'upcomingEvents', value: 'Upcoming Events', languageId: 'en' },
        { id: 34, propertyName: 'personalizedRecommendations', value: 'Personalized Recommendations', languageId: 'en' },

        // Contact Screen
        { id: 35, propertyName: 'message', value: 'Message', languageId: 'en' },
        { id: 36, propertyName: 'enterEmail', value: 'Enter your email', languageId: 'en' },
        { id: 37, propertyName: 'typeMessage', value: 'Type your message here', languageId: 'en' },

        // Privacy Screen
        { id: 38, propertyName: 'managePersonalInfo', value: 'Manage Personal Info Usage', languageId: 'en' },
        { id: 39, propertyName: 'privacyPolicy', value: 'Privacy Policy', languageId: 'en' },
        { id: 40, propertyName: 'informationCollection', value: 'Information Collection', languageId: 'en' },
        { id: 41, propertyName: 'howWeUseInfo', value: 'How We Use Your Information', languageId: 'en' },
        { id: 42, propertyName: 'dataProtection', value: 'Data Protection', languageId: 'en' },
        { id: 43, propertyName: 'yourRights', value: 'Your Rights', languageId: 'en' }
    ],
    tr: [
        // App Settings Screen
        { id: 1, propertyName: 'appSettings', value: 'Uygulama Ayarları', languageId: 'tr' },
        { id: 2, propertyName: 'theme', value: 'Tema', languageId: 'tr' },
        { id: 3, propertyName: 'darkMode', value: 'Karanlık Mod', languageId: 'tr' },
        { id: 4, propertyName: 'language', value: 'Dil', languageId: 'tr' },
        { id: 5, propertyName: 'appInformation', value: 'Uygulama Bilgisi', languageId: 'tr' },
        { id: 6, propertyName: 'version', value: 'Versiyon', languageId: 'tr' },
        { id: 7, propertyName: 'buildnumber', value: 'Yapı Numarası', languageId: 'tr' },
        { id: 8, propertyName: 'environment', value: 'Ortam', languageId: 'tr' },
        { id: 9, propertyName: 'platform', value: 'Platform', languageId: 'tr' },

        // Auth Screens
        { id: 10, propertyName: 'email', value: 'E-posta', languageId: 'tr' },
        { id: 11, propertyName: 'password', value: 'Şifre', languageId: 'tr' },
        { id: 12, propertyName: 'username', value: 'Kullanıcı Adı', languageId: 'tr' },
        { id: 13, propertyName: 'login', value: 'Giriş Yap', languageId: 'tr' },
        { id: 14, propertyName: 'register', value: 'Kayıt Ol', languageId: 'tr' },
        { id: 15, propertyName: 'loginFailed', value: 'Giriş başarısız. Lütfen tekrar deneyin.', languageId: 'tr' },
        { id: 16, propertyName: 'registrationFailed', value: 'Kayıt başarısız. Lütfen tekrar deneyin.', languageId: 'tr' },
        { id: 17, propertyName: 'noAccountRegister', value: 'Hesabınız yok mu? Kayıt olun', languageId: 'tr' },
        { id: 18, propertyName: 'haveAccountLogin', value: 'Zaten hesabınız var mı? Giriş yapın', languageId: 'tr' },

        // Equipment Screens
        { id: 19, propertyName: 'equipmentDetails', value: 'Ekipman Detayları', languageId: 'tr' },
        { id: 20, propertyName: 'description', value: 'Açıklama', languageId: 'tr' },
        { id: 21, propertyName: 'specifications', value: 'Özellikler', languageId: 'tr' },
        { id: 22, propertyName: 'equipmentKind', value: 'Ekipman Türü', languageId: 'tr' },
        { id: 23, propertyName: 'equipmentType', value: 'Ekipman Tipi', languageId: 'tr' },
        { id: 24, propertyName: 'addProductImage', value: 'Ürün Resmi Ekle', languageId: 'tr' },

        // Recipe Screen
        { id: 25, propertyName: 'equipment', value: 'Ekipman', languageId: 'tr' },
        { id: 26, propertyName: 'coffee', value: 'Kahve', languageId: 'tr' },
        { id: 27, propertyName: 'amount', value: 'Miktar', languageId: 'tr' },
        { id: 28, propertyName: 'milk', value: 'Süt', languageId: 'tr' },
        { id: 29, propertyName: 'volume', value: 'Hacim', languageId: 'tr' },
        { id: 30, propertyName: 'temperature', value: 'Sıcaklık', languageId: 'tr' },

        // Premium Screen
        { id: 31, propertyName: 'premium', value: 'Premium', languageId: 'tr' },
        { id: 32, propertyName: 'exclusiveCoupons', value: 'Özel Kuponlar', languageId: 'tr' },
        { id: 33, propertyName: 'upcomingEvents', value: 'Yaklaşan Etkinlikler', languageId: 'tr' },
        { id: 34, propertyName: 'personalizedRecommendations', value: 'Kişiselleştirilmiş Öneriler', languageId: 'tr' },

        // Contact Screen
        { id: 35, propertyName: 'message', value: 'Mesaj', languageId: 'tr' },
        { id: 36, propertyName: 'enterEmail', value: 'E-posta adresinizi girin', languageId: 'tr' },
        { id: 37, propertyName: 'typeMessage', value: 'Mesajınızı buraya yazın', languageId: 'tr' },

        // Privacy Screen
        { id: 38, propertyName: 'managePersonalInfo', value: 'Kişisel Bilgi Kullanımını Yönet', languageId: 'tr' },
        { id: 39, propertyName: 'privacyPolicy', value: 'Gizlilik Politikası', languageId: 'tr' },
        { id: 40, propertyName: 'informationCollection', value: 'Bilgi Toplama', languageId: 'tr' },
        { id: 41, propertyName: 'howWeUseInfo', value: 'Bilgilerinizi Nasıl Kullanıyoruz', languageId: 'tr' },
        { id: 42, propertyName: 'dataProtection', value: 'Veri Koruma', languageId: 'tr' },
        { id: 43, propertyName: 'yourRights', value: 'Haklarınız', languageId: 'tr' }
    ]
}; 