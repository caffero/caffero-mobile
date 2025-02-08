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

        // Common Actions
        { id: 116, propertyName: 'logout', value: 'Logout', languageId: 'en' },

        // What I Brew With Screen
        { id: 117, propertyName: 'myEquipment', value: 'My Equipment', languageId: 'en' },

        // Delete Screens
        { id: 70, propertyName: 'deleteError', value: 'Please select at least one item to delete', languageId: 'en' },
        { id: 71, propertyName: 'confirmDelete', value: 'Confirm Delete', languageId: 'en' },
        { id: 72, propertyName: 'confirmDeleteMessage', value: 'Are you sure you want to delete {count} item(s)?', languageId: 'en' },
        { id: 73, propertyName: 'cancel', value: 'Cancel', languageId: 'en' },
        { id: 74, propertyName: 'delete', value: 'Delete', languageId: 'en' },
        { id: 75, propertyName: 'success', value: 'Success', languageId: 'en' },
        { id: 76, propertyName: 'itemsDeleted', value: 'Selected items have been deleted', languageId: 'en' },
        { id: 77, propertyName: 'ok', value: 'OK', languageId: 'en' },
        { id: 78, propertyName: 'error', value: 'Error', languageId: 'en' },
        { id: 162, propertyName: 'deleteRecipes', value: 'Delete Recipes', languageId: 'en' },

        // Equipment Management
        { id: 116, propertyName: 'createEquipment', value: 'Create Equipment', languageId: 'en' },
        { id: 117, propertyName: 'title', value: 'Title', languageId: 'en' },
        { id: 118, propertyName: 'enterEquipmentName', value: 'Enter equipment name', languageId: 'en' },
        { id: 119, propertyName: 'fillAllFields', value: 'Please fill all fields', languageId: 'en' },
        { id: 120, propertyName: 'equipmentAddedSuccess', value: 'Equipment added successfully', languageId: 'en' },
        { id: 121, propertyName: 'discardChanges', value: 'Discard Changes', languageId: 'en' },
        { id: 122, propertyName: 'discardChangesMessage', value: 'Your changes will be lost. Are you sure?', languageId: 'en' },
        { id: 123, propertyName: 'discard', value: 'Discard', languageId: 'en' },
        { id: 124, propertyName: 'saveEquipment', value: 'Save Equipment', languageId: 'en' },

        // Equipment Types
        { id: 125, propertyName: 'equipmentKind.Chemex', value: 'Chemex', languageId: 'en' },
        { id: 126, propertyName: 'equipmentKind.V60', value: 'V60', languageId: 'en' },
        { id: 127, propertyName: 'equipmentKind.Aeropress', value: 'Aeropress', languageId: 'en' },
        { id: 128, propertyName: 'equipmentKind.FrenchPress', value: 'French Press', languageId: 'en' },
        { id: 129, propertyName: 'equipmentKind.MokaPot', value: 'Moka Pot', languageId: 'en' },
        { id: 130, propertyName: 'equipmentType.Dripper', value: 'Dripper', languageId: 'en' },
        { id: 131, propertyName: 'equipmentType.Immersion', value: 'Immersion', languageId: 'en' },
        { id: 132, propertyName: 'equipmentType.Espresso', value: 'Espresso', languageId: 'en' },
        { id: 133, propertyName: 'equipmentType.Grinder', value: 'Grinder', languageId: 'en' },
        { id: 134, propertyName: 'equipmentType.Scale', value: 'Scale', languageId: 'en' },
        { id: 135, propertyName: 'equipmentType.Kettle', value: 'Kettle', languageId: 'en' },

        // Add Coffee Bean Screen
        { id: 136, propertyName: 'addCoffeeBean', value: 'Add Coffee Bean', languageId: 'en' },
        { id: 137, propertyName: 'searchCoffeeBeans', value: 'Search coffee beans', languageId: 'en' },
        { id: 138, propertyName: 'filterCoffeeBeans', value: 'Filter Coffee Beans', languageId: 'en' },
        { id: 139, propertyName: 'searchByName', value: 'Search by name', languageId: 'en' },
        { id: 140, propertyName: 'roastery', value: 'Roastery', languageId: 'en' },
        { id: 141, propertyName: 'country', value: 'Country', languageId: 'en' },
        { id: 142, propertyName: 'acidity', value: 'Acidity', languageId: 'en' },
        { id: 143, propertyName: 'body', value: 'Body', languageId: 'en' },
        { id: 144, propertyName: 'clearFilters', value: 'Clear Filters', languageId: 'en' },
        { id: 145, propertyName: 'applyFilters', value: 'Apply Filters', languageId: 'en' },
        { id: 146, propertyName: 'cantFindCoffee', value: "Can't find your coffee?", languageId: 'en' },
        { id: 147, propertyName: 'suggestProduct', value: 'Suggest Product', languageId: 'en' },
        { id: 148, propertyName: 'coffeeAddedToShelf', value: 'Coffee bean added to your shelf', languageId: 'en' },

        // Update Recipe Screen
        { id: 149, propertyName: 'enterRecipeName', value: 'Enter recipe name', languageId: 'en' },
        { id: 150, propertyName: 'selectEquipment', value: 'Select Equipment', languageId: 'en' },
        { id: 151, propertyName: 'selectCoffeeBean', value: 'Select Coffee Bean', languageId: 'en' },
        { id: 152, propertyName: 'milkVolume', value: 'Milk Volume', languageId: 'en' },
        { id: 153, propertyName: 'milkTemperature', value: 'Milk Temperature', languageId: 'en' },
        { id: 154, propertyName: 'enterMilkVolume', value: 'Enter milk volume', languageId: 'en' },
        { id: 155, propertyName: 'enterMilkTemperature', value: 'Enter milk temperature', languageId: 'en' },
        { id: 156, propertyName: 'enterVolume', value: 'Enter volume', languageId: 'en' },
        { id: 157, propertyName: 'enterTime', value: 'Enter time', languageId: 'en' },
        { id: 158, propertyName: 'enterTemperature', value: 'Enter temperature', languageId: 'en' },
        { id: 159, propertyName: 'addStep', value: 'Add Step', languageId: 'en' },
        { id: 160, propertyName: 'fillRequiredFields', value: 'Please fill all required fields', languageId: 'en' },
        { id: 161, propertyName: 'recipeUpdateSuccess', value: 'Recipe updated successfully', languageId: 'en' },

        // OTP Screen
        { id: 163, propertyName: 'confirmOtp', value: 'Confirm OTP', languageId: 'en' },
        { id: 164, propertyName: 'otpVerificationFailed', value: 'OTP verification failed. Please try again.', languageId: 'en' },
        { id: 165, propertyName: 'checkEmailForOtp', value: 'Check your email for verification code.', languageId: 'en' },
        { id: 166, propertyName: 'submit', value: 'Submit', languageId: 'en' }
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

        // Common Actions
        { id: 116, propertyName: 'logout', value: 'Çıkış Yap', languageId: 'tr' },

        // What I Brew With Screen
        { id: 117, propertyName: 'myEquipment', value: 'Ekipmanlarım', languageId: 'tr' },

        // Delete Screens
        { id: 70, propertyName: 'deleteError', value: 'Lütfen silmek için en az bir öğe seçin', languageId: 'tr' },
        { id: 71, propertyName: 'confirmDelete', value: 'Silmeyi Onayla', languageId: 'tr' },
        { id: 72, propertyName: 'confirmDeleteMessage', value: '{count} öğeyi silmek istediğinizden emin misiniz?', languageId: 'tr' },
        { id: 73, propertyName: 'cancel', value: 'İptal', languageId: 'tr' },
        { id: 74, propertyName: 'delete', value: 'Sil', languageId: 'tr' },
        { id: 75, propertyName: 'success', value: 'Başarılı', languageId: 'tr' },
        { id: 76, propertyName: 'itemsDeleted', value: 'Seçili öğeler silindi', languageId: 'tr' },
        { id: 77, propertyName: 'ok', value: 'Tamam', languageId: 'tr' },
        { id: 78, propertyName: 'error', value: 'Hata', languageId: 'tr' },
        { id: 162, propertyName: 'deleteRecipes', value: 'Tarifleri Sil', languageId: 'tr' },

        // Equipment Management
        { id: 116, propertyName: 'createEquipment', value: 'Ekipman Oluştur', languageId: 'tr' },
        { id: 117, propertyName: 'title', value: 'Başlık', languageId: 'tr' },
        { id: 118, propertyName: 'enterEquipmentName', value: 'Ekipman adı girin', languageId: 'tr' },
        { id: 119, propertyName: 'fillAllFields', value: 'Lütfen tüm alanları doldurun', languageId: 'tr' },
        { id: 120, propertyName: 'equipmentAddedSuccess', value: 'Ekipman başarıyla eklendi', languageId: 'tr' },
        { id: 121, propertyName: 'discardChanges', value: 'Değişiklikleri İptal Et', languageId: 'tr' },
        { id: 122, propertyName: 'discardChangesMessage', value: 'Değişiklikleriniz kaybolacak. Emin misiniz?', languageId: 'tr' },
        { id: 123, propertyName: 'discard', value: 'İptal Et', languageId: 'tr' },
        { id: 124, propertyName: 'saveEquipment', value: 'Ekipmanı Kaydet', languageId: 'tr' },

        // Equipment Types
        { id: 125, propertyName: 'equipmentKind.Chemex', value: 'Chemex', languageId: 'tr' },
        { id: 126, propertyName: 'equipmentKind.V60', value: 'V60', languageId: 'tr' },
        { id: 127, propertyName: 'equipmentKind.Aeropress', value: 'Aeropress', languageId: 'tr' },
        { id: 128, propertyName: 'equipmentKind.FrenchPress', value: 'French Press', languageId: 'tr' },
        { id: 129, propertyName: 'equipmentKind.MokaPot', value: 'Moka Pot', languageId: 'tr' },
        { id: 130, propertyName: 'equipmentType.Dripper', value: 'Dripper', languageId: 'tr' },
        { id: 131, propertyName: 'equipmentType.Immersion', value: 'Demleme', languageId: 'tr' },
        { id: 132, propertyName: 'equipmentType.Espresso', value: 'Espresso', languageId: 'tr' },
        { id: 133, propertyName: 'equipmentType.Grinder', value: 'Öğütücü', languageId: 'tr' },
        { id: 134, propertyName: 'equipmentType.Scale', value: 'Tartı', languageId: 'tr' },
        { id: 135, propertyName: 'equipmentType.Kettle', value: 'Kettle', languageId: 'tr' },

        // Add Coffee Bean Screen
        { id: 136, propertyName: 'addCoffeeBean', value: 'Kahve Çekirdeği Ekle', languageId: 'tr' },
        { id: 137, propertyName: 'searchCoffeeBeans', value: 'Kahve çekirdeklerini ara', languageId: 'tr' },
        { id: 138, propertyName: 'filterCoffeeBeans', value: 'Kahve Çekirdeklerini Filtrele', languageId: 'tr' },
        { id: 139, propertyName: 'searchByName', value: 'İsme göre ara', languageId: 'tr' },
        { id: 140, propertyName: 'roastery', value: 'Kavurma', languageId: 'tr' },
        { id: 141, propertyName: 'country', value: 'Ülke', languageId: 'tr' },
        { id: 142, propertyName: 'acidity', value: 'Asitlik', languageId: 'tr' },
        { id: 143, propertyName: 'body', value: 'Gövde', languageId: 'tr' },
        { id: 144, propertyName: 'clearFilters', value: 'Filtreleri Temizle', languageId: 'tr' },
        { id: 145, propertyName: 'applyFilters', value: 'Filtreleri Uygula', languageId: 'tr' },
        { id: 146, propertyName: 'cantFindCoffee', value: 'Kahvenizi bulamıyor musunuz?', languageId: 'tr' },
        { id: 147, propertyName: 'suggestProduct', value: 'Ürün Öner', languageId: 'tr' },
        { id: 148, propertyName: 'coffeeAddedToShelf', value: 'Kahve çekirdeği rafınıza eklendi', languageId: 'tr' },

        // Update Recipe Screen
        { id: 149, propertyName: 'enterRecipeName', value: 'Tarif adı girin', languageId: 'tr' },
        { id: 150, propertyName: 'selectEquipment', value: 'Ekipman Seçin', languageId: 'tr' },
        { id: 151, propertyName: 'selectCoffeeBean', value: 'Kahve Çekirdeği Seçin', languageId: 'tr' },
        { id: 152, propertyName: 'milkVolume', value: 'Süt Miktarı', languageId: 'tr' },
        { id: 153, propertyName: 'milkTemperature', value: 'Süt Sıcaklığı', languageId: 'tr' },
        { id: 154, propertyName: 'enterMilkVolume', value: 'Süt miktarını girin', languageId: 'tr' },
        { id: 155, propertyName: 'enterMilkTemperature', value: 'Süt sıcaklığını girin', languageId: 'tr' },
        { id: 156, propertyName: 'enterVolume', value: 'Miktar girin', languageId: 'tr' },
        { id: 157, propertyName: 'enterTime', value: 'Süre girin', languageId: 'tr' },
        { id: 158, propertyName: 'enterTemperature', value: 'Sıcaklık girin', languageId: 'tr' },
        { id: 159, propertyName: 'addStep', value: 'Adım Ekle', languageId: 'tr' },
        { id: 160, propertyName: 'fillRequiredFields', value: 'Lütfen gerekli alanları doldurun', languageId: 'tr' },
        { id: 161, propertyName: 'recipeUpdateSuccess', value: 'Tarif başarıyla güncellendi', languageId: 'tr' },

        // OTP Screen
        { id: 163, propertyName: 'confirmOtp', value: 'Doğrulama kodunu girin', languageId: 'tr' },
        { id: 164, propertyName: 'otpVerificationFailed', value: 'OTP doğrulaması başarısız. Lütfen tekrar deneyin.', languageId: 'tr' },
        { id: 165, propertyName: 'checkEmailForOtp', value: 'Doğrulama kodu için e-postanızı kontrol edin.', languageId: 'tr' },
        { id: 166, propertyName: 'submit', value: 'Gönder', languageId: 'tr' }
    ]
}; 