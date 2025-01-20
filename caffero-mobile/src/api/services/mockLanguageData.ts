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
        { id: 35, propertyName: 'premiumTitle', value: 'Upgrade to Premium', languageId: 'en' },
        { id: 36, propertyName: 'premiumDescription', value: 'Get access to exclusive features and content', languageId: 'en' },
        { id: 37, propertyName: 'upgradeToPremium', value: 'Upgrade Now', languageId: 'en' },

        // Contact Screen
        { id: 38, propertyName: 'message', value: 'Message', languageId: 'en' },
        { id: 39, propertyName: 'enterEmail', value: 'Enter your email', languageId: 'en' },
        { id: 40, propertyName: 'typeMessage', value: 'Type your message here', languageId: 'en' },

        // Privacy Screen
        { id: 41, propertyName: 'managePersonalInfo', value: 'Manage Personal Info Usage', languageId: 'en' },
        { id: 42, propertyName: 'privacyPolicy', value: 'Privacy Policy', languageId: 'en' },
        { id: 43, propertyName: 'privacyPolicyIntro', value: 'At Caffero, we take your privacy seriously. This notice explains how we collect, use, and protect your personal information.', languageId: 'en' },
        { id: 44, propertyName: 'informationCollection', value: 'Information Collection', languageId: 'en' },
        { id: 45, propertyName: 'informationCollectionText', value: 'We collect information that you provide directly to us, including your name, email address, and coffee preferences. We also collect data about your coffee brewing habits and equipment usage to enhance your experience.', languageId: 'en' },
        { id: 46, propertyName: 'howWeUseInfo', value: 'How We Use Your Information', languageId: 'en' },
        { id: 47, propertyName: 'howWeUseInfoText', value: 'Your information helps us personalize your coffee experience, provide brewing recommendations, and improve our services. We never sell your personal data to third parties.', languageId: 'en' },
        { id: 48, propertyName: 'dataProtection', value: 'Data Protection', languageId: 'en' },
        { id: 49, propertyName: 'dataProtectionText', value: 'We implement industry-standard security measures to protect your data. Your information is encrypted and stored securely on our servers.', languageId: 'en' },
        { id: 50, propertyName: 'yourRights', value: 'Your Rights', languageId: 'en' },
        { id: 51, propertyName: 'yourRightsText', value: 'You have the right to access, modify, or delete your personal information at any time. Contact our support team for assistance with managing your data.', languageId: 'en' },
        { id: 52, propertyName: 'lastUpdated', value: 'Last updated: June 2023', languageId: 'en' },

        // Scan Screen
        { id: 53, propertyName: 'scan', value: 'Scan', languageId: 'en' },
        { id: 54, propertyName: 'noCameraAccess', value: 'No access to camera', languageId: 'en' },

        // Home Screen
        { id: 55, propertyName: 'appName', value: 'Caffero', languageId: 'en' },
        { id: 56, propertyName: 'trending', value: 'Trending', languageId: 'en' },
        { id: 57, propertyName: 'forYourTaste', value: 'For Your Taste', languageId: 'en' },
        { id: 58, propertyName: 'discoverCoffee', value: 'Discover Coffee', languageId: 'en' },

        // Shelf Screen
        { id: 59, propertyName: 'whatIBrew', value: 'What I Brew', languageId: 'en' },
        { id: 60, propertyName: 'whatIBrewWith', value: 'What I Brew With', languageId: 'en' },
        { id: 61, propertyName: 'howIBrew', value: 'How I Brew', languageId: 'en' },

        // Recipe Detail Screen
        { id: 62, propertyName: 'waterVolume', value: 'Water Volume', languageId: 'en' },
        { id: 63, propertyName: 'time', value: 'Time', languageId: 'en' },
        { id: 64, propertyName: 'pouringSteps', value: 'Pouring Steps', languageId: 'en' },
        { id: 65, propertyName: 'step', value: 'Step', languageId: 'en' },
        { id: 66, propertyName: 'seconds', value: 's', languageId: 'en' },
        { id: 67, propertyName: 'milliliters', value: 'ml', languageId: 'en' },
        { id: 68, propertyName: 'celsius', value: '°C', languageId: 'en' },
        { id: 69, propertyName: 'grams', value: 'g', languageId: 'en' },

        // Profile Screen
        { id: 79, propertyName: 'profile', value: 'Profile', languageId: 'en' },
        { id: 80, propertyName: 'editProfile', value: 'Edit Profile', languageId: 'en' },
        { id: 81, propertyName: 'notificationSettings', value: 'Notification Settings', languageId: 'en' },
        { id: 82, propertyName: 'privacy', value: 'Privacy', languageId: 'en' },
        { id: 83, propertyName: 'contactUs', value: 'Contact Us', languageId: 'en' },
        { id: 84, propertyName: 'defaultUsername', value: 'Guest User', languageId: 'en' },
        { id: 85, propertyName: 'defaultEmail', value: 'guest@example.com', languageId: 'en' },
        { id: 86, propertyName: 'premiumUser', value: 'Premium', languageId: 'en' },
        { id: 87, propertyName: 'freeUser', value: 'Free', languageId: 'en' },

        // Equipment Detail Screen
        { id: 88, propertyName: 'equipmentDetails', value: 'Equipment Details', languageId: 'en' },
        { id: 89, propertyName: 'description', value: 'Description', languageId: 'en' },
        { id: 90, propertyName: 'specifications', value: 'Specifications', languageId: 'en' },
        { id: 91, propertyName: 'specCapacity', value: 'Capacity', languageId: 'en' },
        { id: 92, propertyName: 'specMaterial', value: 'Material', languageId: 'en' },
        { id: 93, propertyName: 'specFilter', value: 'Filter', languageId: 'en' },
        { id: 94, propertyName: 'equipmentType', value: 'Type', languageId: 'en' },
        { id: 95, propertyName: 'equipmentKind', value: 'Kind', languageId: 'en' },

        // Edit Profile Screen
        { id: 96, propertyName: 'enterUsername', value: 'Enter username', languageId: 'en' },
        { id: 97, propertyName: 'enterEmail', value: 'Enter email', languageId: 'en' },
        { id: 98, propertyName: 'saveChanges', value: 'Save Changes', languageId: 'en' },
        { id: 99, propertyName: 'usernameEmailRequired', value: 'Username and email are required', languageId: 'en' },
        { id: 100, propertyName: 'invalidEmail', value: 'Please enter a valid email address', languageId: 'en' },
        { id: 101, propertyName: 'profileUpdateSuccess', value: 'Profile updated successfully', languageId: 'en' },

        // Contact Us Screen
        { id: 102, propertyName: 'name', value: 'Name', languageId: 'en' },
        { id: 103, propertyName: 'enterName', value: 'Enter your name', languageId: 'en' },
        { id: 104, propertyName: 'message', value: 'Message', languageId: 'en' },
        { id: 105, propertyName: 'typeMessage', value: 'Type your message here', languageId: 'en' },
        { id: 106, propertyName: 'sendMessage', value: 'Send Message', languageId: 'en' },

        // Notification Settings Screen
        { id: 107, propertyName: 'manageNotifications', value: 'Manage Notifications', languageId: 'en' },
        { id: 108, propertyName: 'pushNotifications', value: 'Push Notifications', languageId: 'en' },
        { id: 109, propertyName: 'emailNotifications', value: 'Email Notifications', languageId: 'en' },
        { id: 110, propertyName: 'smsNotifications', value: 'SMS Notifications', languageId: 'en' },

        // Recipe Detail Screen
        { id: 111, propertyName: 'defaultUsername', value: 'Guest User', languageId: 'en' },
        { id: 112, propertyName: 'updateRecipe', value: 'Update Recipe', languageId: 'en' },
        { id: 113, propertyName: 'recipeTitle', value: 'Recipe Title', languageId: 'en' },
        { id: 114, propertyName: 'coffeeName', value: 'Coffee Name', languageId: 'en' },
        { id: 115, propertyName: 'useMilk', value: 'Use Milk', languageId: 'en' },

        // Delete Screens
        { id: 70, propertyName: 'deleteError', value: 'Please select at least one item to delete', languageId: 'en' },
        { id: 71, propertyName: 'confirmDelete', value: 'Confirm Delete', languageId: 'en' },
        { id: 72, propertyName: 'confirmDeleteMessage', value: 'Are you sure you want to delete {count} item(s)?', languageId: 'en' },
        { id: 73, propertyName: 'cancel', value: 'Cancel', languageId: 'en' },
        { id: 74, propertyName: 'delete', value: 'Delete', languageId: 'en' },
        { id: 75, propertyName: 'success', value: 'Success', languageId: 'en' },
        { id: 76, propertyName: 'itemsDeleted', value: 'Selected items have been deleted', languageId: 'en' },
        { id: 77, propertyName: 'ok', value: 'OK', languageId: 'en' },
        { id: 78, propertyName: 'error', value: 'Error', languageId: 'en' }
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
        { id: 35, propertyName: 'premiumTitle', value: 'Premium\'a Yükselt', languageId: 'tr' },
        { id: 36, propertyName: 'premiumDescription', value: 'Özel özelliklere ve içeriğe erişim kazanın', languageId: 'tr' },
        { id: 37, propertyName: 'upgradeToPremium', value: 'Şimdi Yükselt', languageId: 'tr' },

        // Contact Screen
        { id: 38, propertyName: 'message', value: 'Mesaj', languageId: 'tr' },
        { id: 39, propertyName: 'enterEmail', value: 'E-posta adresinizi girin', languageId: 'tr' },
        { id: 40, propertyName: 'typeMessage', value: 'Mesajınızı buraya yazın', languageId: 'tr' },

        // Privacy Screen
        { id: 41, propertyName: 'managePersonalInfo', value: 'Kişisel Bilgi Kullanımını Yönet', languageId: 'tr' },
        { id: 42, propertyName: 'privacyPolicy', value: 'Gizlilik Politikası', languageId: 'tr' },
        { id: 43, propertyName: 'privacyPolicyIntro', value: 'Caffero\'da gizliliğinizi ciddiye alıyoruz. Bu bildirim, kişisel bilgilerinizi nasıl topladığımızı, kullandığımızı ve koruduğumuzu açıklar.', languageId: 'tr' },
        { id: 44, propertyName: 'informationCollection', value: 'Bilgi Toplama', languageId: 'tr' },
        { id: 45, propertyName: 'informationCollectionText', value: 'Doğrudan bize sağladığınız ad, e-posta adresi ve kahve tercihleriniz gibi bilgileri topluyoruz. Ayrıca deneyiminizi geliştirmek için kahve demleme alışkanlıklarınız ve ekipman kullanımınız hakkında veri topluyoruz.', languageId: 'tr' },
        { id: 46, propertyName: 'howWeUseInfo', value: 'Bilgilerinizi Nasıl Kullanıyoruz', languageId: 'tr' },
        { id: 47, propertyName: 'howWeUseInfoText', value: 'Bilgileriniz kahve deneyiminizi kişiselleştirmemize, demleme önerileri sunmamıza ve hizmetlerimizi geliştirmemize yardımcı olur. Kişisel verilerinizi asla üçüncü taraflara satmayız.', languageId: 'tr' },
        { id: 48, propertyName: 'dataProtection', value: 'Veri Koruma', languageId: 'tr' },
        { id: 49, propertyName: 'dataProtectionText', value: 'Verilerinizi korumak için endüstri standardı güvenlik önlemleri uyguluyoruz. Bilgileriniz şifrelenir ve sunucularımızda güvenle saklanır.', languageId: 'tr' },
        { id: 50, propertyName: 'yourRights', value: 'Haklarınız', languageId: 'tr' },
        { id: 51, propertyName: 'yourRightsText', value: 'Kişisel bilgilerinize istediğiniz zaman erişme, değiştirme veya silme hakkına sahipsiniz. Verilerinizi yönetme konusunda yardım için destek ekibimizle iletişime geçin.', languageId: 'tr' },
        { id: 52, propertyName: 'lastUpdated', value: 'Son güncelleme: Haziran 2023', languageId: 'tr' },

        // Scan Screen
        { id: 53, propertyName: 'scan', value: 'Tara', languageId: 'tr' },
        { id: 54, propertyName: 'noCameraAccess', value: 'Kamera erişimi yok', languageId: 'tr' },

        // Home Screen
        { id: 55, propertyName: 'appName', value: 'Caffero', languageId: 'tr' },
        { id: 56, propertyName: 'trending', value: 'Trend', languageId: 'tr' },
        { id: 57, propertyName: 'forYourTaste', value: 'Damak Tadınıza Göre', languageId: 'tr' },
        { id: 58, propertyName: 'discoverCoffee', value: 'Kahveyi Keşfet', languageId: 'tr' },

        // Shelf Screen
        { id: 59, propertyName: 'whatIBrew', value: 'Ne Demliyorum', languageId: 'tr' },
        { id: 60, propertyName: 'whatIBrewWith', value: 'Ne ile Demliyorum', languageId: 'tr' },
        { id: 61, propertyName: 'howIBrew', value: 'Nasıl Demliyorum', languageId: 'tr' },

        // Recipe Detail Screen
        { id: 62, propertyName: 'waterVolume', value: 'Su Miktarı', languageId: 'tr' },
        { id: 63, propertyName: 'time', value: 'Süre', languageId: 'tr' },
        { id: 64, propertyName: 'pouringSteps', value: 'Demleme Adımları', languageId: 'tr' },
        { id: 65, propertyName: 'step', value: 'Adım', languageId: 'tr' },
        { id: 66, propertyName: 'seconds', value: 'sn', languageId: 'tr' },
        { id: 67, propertyName: 'milliliters', value: 'ml', languageId: 'tr' },
        { id: 68, propertyName: 'celsius', value: '°C', languageId: 'tr' },
        { id: 69, propertyName: 'grams', value: 'gr', languageId: 'tr' },

        // Profile Screen
        { id: 79, propertyName: 'profile', value: 'Profil', languageId: 'tr' },
        { id: 80, propertyName: 'editProfile', value: 'Profili Düzenle', languageId: 'tr' },
        { id: 81, propertyName: 'notificationSettings', value: 'Bildirim Ayarları', languageId: 'tr' },
        { id: 82, propertyName: 'privacy', value: 'Gizlilik', languageId: 'tr' },
        { id: 83, propertyName: 'contactUs', value: 'Bize Ulaşın', languageId: 'tr' },
        { id: 84, propertyName: 'defaultUsername', value: 'Misafir Kullanıcı', languageId: 'tr' },
        { id: 85, propertyName: 'defaultEmail', value: 'misafir@example.com', languageId: 'tr' },
        { id: 86, propertyName: 'premiumUser', value: 'Premium', languageId: 'tr' },
        { id: 87, propertyName: 'freeUser', value: 'Ücretsiz', languageId: 'tr' },

        // Equipment Detail Screen
        { id: 88, propertyName: 'equipmentDetails', value: 'Ekipman Detayları', languageId: 'tr' },
        { id: 89, propertyName: 'description', value: 'Açıklama', languageId: 'tr' },
        { id: 90, propertyName: 'specifications', value: 'Özellikler', languageId: 'tr' },
        { id: 91, propertyName: 'specCapacity', value: 'Kapasite', languageId: 'tr' },
        { id: 92, propertyName: 'specMaterial', value: 'Malzeme', languageId: 'tr' },
        { id: 93, propertyName: 'specFilter', value: 'Filtre', languageId: 'tr' },
        { id: 94, propertyName: 'equipmentType', value: 'Tip', languageId: 'tr' },
        { id: 95, propertyName: 'equipmentKind', value: 'Tür', languageId: 'tr' },

        // Edit Profile Screen
        { id: 96, propertyName: 'enterUsername', value: 'Kullanıcı adı girin', languageId: 'tr' },
        { id: 97, propertyName: 'enterEmail', value: 'E-posta girin', languageId: 'tr' },
        { id: 98, propertyName: 'saveChanges', value: 'Değişiklikleri Kaydet', languageId: 'tr' },
        { id: 99, propertyName: 'usernameEmailRequired', value: 'Kullanıcı adı ve e-posta gereklidir', languageId: 'tr' },
        { id: 100, propertyName: 'invalidEmail', value: 'Lütfen geçerli bir e-posta adresi girin', languageId: 'tr' },
        { id: 101, propertyName: 'profileUpdateSuccess', value: 'Profil başarıyla güncellendi', languageId: 'tr' },

        // Contact Us Screen
        { id: 102, propertyName: 'name', value: 'İsim', languageId: 'tr' },
        { id: 103, propertyName: 'enterName', value: 'İsminizi girin', languageId: 'tr' },
        { id: 104, propertyName: 'message', value: 'Mesaj', languageId: 'tr' },
        { id: 105, propertyName: 'typeMessage', value: 'Mesajınızı buraya yazın', languageId: 'tr' },
        { id: 106, propertyName: 'sendMessage', value: 'Mesaj Gönder', languageId: 'tr' },

        // Notification Settings Screen
        { id: 107, propertyName: 'manageNotifications', value: 'Bildirimleri Yönet', languageId: 'tr' },
        { id: 108, propertyName: 'pushNotifications', value: 'Anlık Bildirimler', languageId: 'tr' },
        { id: 109, propertyName: 'emailNotifications', value: 'E-posta Bildirimleri', languageId: 'tr' },
        { id: 110, propertyName: 'smsNotifications', value: 'SMS Bildirimleri', languageId: 'tr' },

        // Recipe Detail Screen
        { id: 111, propertyName: 'defaultUsername', value: 'Misafir Kullanıcı', languageId: 'tr' },
        { id: 112, propertyName: 'updateRecipe', value: 'Tarifi Güncelle', languageId: 'tr' },
        { id: 113, propertyName: 'recipeTitle', value: 'Tarif Başlığı', languageId: 'tr' },
        { id: 114, propertyName: 'coffeeName', value: 'Kahve Adı', languageId: 'tr' },
        { id: 115, propertyName: 'useMilk', value: 'Süt Kullan', languageId: 'tr' },

        // Delete Screens
        { id: 70, propertyName: 'deleteError', value: 'Lütfen silmek için en az bir öğe seçin', languageId: 'tr' },
        { id: 71, propertyName: 'confirmDelete', value: 'Silmeyi Onayla', languageId: 'tr' },
        { id: 72, propertyName: 'confirmDeleteMessage', value: '{count} öğeyi silmek istediğinizden emin misiniz?', languageId: 'tr' },
        { id: 73, propertyName: 'cancel', value: 'İptal', languageId: 'tr' },
        { id: 74, propertyName: 'delete', value: 'Sil', languageId: 'tr' },
        { id: 75, propertyName: 'success', value: 'Başarılı', languageId: 'tr' },
        { id: 76, propertyName: 'itemsDeleted', value: 'Seçili öğeler silindi', languageId: 'tr' },
        { id: 77, propertyName: 'ok', value: 'Tamam', languageId: 'tr' },
        { id: 78, propertyName: 'error', value: 'Hata', languageId: 'tr' }
    ]
}; 