export interface Language {
    code: string;
    name: string;
    nativeName: string;
}

export const languages: Language[] = [
    { code: "en", name: "English", nativeName: "English" },
    { code: "es", name: "Spanish", nativeName: "Español" },
    { code: "fr", name: "French", nativeName: "Français" },
    { code: "de", name: "German", nativeName: "Deutsch" },
    { code: "it", name: "Italian", nativeName: "Italiano" },
    { code: "pt", name: "Portuguese", nativeName: "Português" },
    { code: "ru", name: "Russian", nativeName: "Русский" },
    { code: "ja", name: "Japanese", nativeName: "日本語" },
    { code: "ko", name: "Korean", nativeName: "한국어" },
    { code: "zh", name: "Chinese", nativeName: "中文" },
    { code: "ar", name: "Arabic", nativeName: "العربية" },
    { code: "hi", name: "Hindi", nativeName: "हिन्दी" },
    { code: "bn", name: "Bengali", nativeName: "বাংলা" },
    { code: "tr", name: "Turkish", nativeName: "Türkçe" },
    { code: "pl", name: "Polish", nativeName: "Polski" },
    { code: "nl", name: "Dutch", nativeName: "Nederlands" },
    { code: "sv", name: "Swedish", nativeName: "Svenska" },
    { code: "da", name: "Danish", nativeName: "Dansk" },
    { code: "no", name: "Norwegian", nativeName: "Norsk" },
    { code: "fi", name: "Finnish", nativeName: "Suomi" },
    { code: "el", name: "Greek", nativeName: "Ελληνικά" },
    { code: "he", name: "Hebrew", nativeName: "עברית" },
    { code: "th", name: "Thai", nativeName: "ไทย" },
    { code: "vi", name: "Vietnamese", nativeName: "Tiếng Việt" },
    { code: "uk", name: "Ukrainian", nativeName: "Українська" },
    { code: "cs", name: "Czech", nativeName: "Čeština" },
    { code: "hu", name: "Hungarian", nativeName: "Magyar" },
    { code: "ro", name: "Romanian", nativeName: "Română" },
    { code: "bg", name: "Bulgarian", nativeName: "Български" },
    { code: "hr", name: "Croatian", nativeName: "Hrvatski" },
    { code: "sk", name: "Slovak", nativeName: "Slovenčina" },
    { code: "sl", name: "Slovenian", nativeName: "Slovenščina" },
    { code: "et", name: "Estonian", nativeName: "Eesti" },
    { code: "lv", name: "Latvian", nativeName: "Latviešu" },
    { code: "lt", name: "Lithuanian", nativeName: "Lietuvių" },
    { code: "mt", name: "Maltese", nativeName: "Malti" },
    { code: "id", name: "Indonesian", nativeName: "Bahasa Indonesia" },
    { code: "ms", name: "Malay", nativeName: "Bahasa Melayu" },
    { code: "tl", name: "Filipino", nativeName: "Filipino" },
    { code: "sw", name: "Swahili", nativeName: "Kiswahili" },
    { code: "af", name: "Afrikaans", nativeName: "Afrikaans" },
    { code: "sq", name: "Albanian", nativeName: "Shqip" },
    { code: "eu", name: "Basque", nativeName: "Euskera" },
    { code: "be", name: "Belarusian", nativeName: "Беларуская" },
    { code: "bs", name: "Bosnian", nativeName: "Bosanski" },
    { code: "ca", name: "Catalan", nativeName: "Català" },
    { code: "cy", name: "Welsh", nativeName: "Cymraeg" },
    { code: "ga", name: "Irish", nativeName: "Gaeilge" },
    { code: "is", name: "Icelandic", nativeName: "Íslenska" },
    { code: "lb", name: "Luxembourgish", nativeName: "Lëtzebuergesch" },
    { code: "mk", name: "Macedonian", nativeName: "Македонски" },
    { code: "sr", name: "Serbian", nativeName: "Српски" },
];

// Popular languages that should appear at the top
export const popularLanguages: Language[] = [
    { code: "en", name: "English", nativeName: "English" },
    { code: "es", name: "Spanish", nativeName: "Español" },
    { code: "fr", name: "French", nativeName: "Français" },
    { code: "de", name: "German", nativeName: "Deutsch" },
    { code: "it", name: "Italian", nativeName: "Italiano" },
    { code: "pt", name: "Portuguese", nativeName: "Português" },
    { code: "ru", name: "Russian", nativeName: "Русский" },
    { code: "ja", name: "Japanese", nativeName: "日本語" },
    { code: "ko", name: "Korean", nativeName: "한국어" },
    { code: "zh", name: "Chinese", nativeName: "中文" },
    { code: "ar", name: "Arabic", nativeName: "العربية" },
    { code: "hi", name: "Hindi", nativeName: "हिन्दी" },
];

// Get sorted languages with popular ones first
export const getSortedLanguages = (): Language[] => {
    const popularCodes = popularLanguages.map(l => l.code);
    const otherLanguages = languages
        .filter(language => !popularCodes.includes(language.code))
        .sort((a, b) => a.name.localeCompare(b.name));

    return [...popularLanguages, ...otherLanguages];
};
