import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import commonEn from './locale/en/common.json';
import labelEn from './locale/en/label.json';
import descriptionEn from './locale/en/description.json';
import unitEn from './locale/en/unit.json';
import placeholderEn from './locale/en/placeholder.json';

i18n.use(initReactI18next).init({
    debug: true,
    fallbackLng: 'en',
    resources: {
        en: {
            common: commonEn,
            label:labelEn,
            description: descriptionEn,
            unit: unitEn,
            placeholder:placeholderEn,
        },
    },
    returnNull: false,
});

i18n.services.formatter?.add('uppercase', (value, lng) => {
    if (lng === 'en') {
        return value.toUpperCase();
    }
    return value;
});

i18n.services.formatter?.add('lowercase', (value, lng) => {
    if (lng === 'en') {
        return value.toLowerCase();
    }
    return value;
});

i18n.services.formatter?.add('capitalize', (value, lng) => {
    if (lng === 'en') {
        return value.charAt(0).toUpperCase() + value.slice(1);
    }
    return value;
});

i18n.services.formatter?.add('dateTime', (value, lng) => {
    if (lng === 'en') {

        const dateTime = new Date(value);

        const day = dateTime.getDate().toString().padStart(2, '0');
        const month = (dateTime.getMonth() + 1).toString().padStart(2, '0');
        const year = dateTime.getFullYear().toString();
        const hours = dateTime.getHours().toString().padStart(2, '0');
        const minutes = dateTime.getMinutes().toString().padStart(2, '0');
        const seconds = dateTime.getSeconds().toString().padStart(2, '0');

        return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
    }
    return value;
});

export default i18n;
