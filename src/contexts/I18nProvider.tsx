import i18nextDefault, { i18n as I18nextInstance } from "i18next"
import { PropsWithChildren, createContext, useCallback, useMemo, useState } from "react"

export type TranslationLoader = () => { default: any }

export type TranslationLoaders = {
    [language: string]: TranslationLoader
}

export type I18nProviderProps = {
    language: string
    translationLoaders: TranslationLoaders
    fallbackLanguage?: string
    i18nextInstance?: I18nextInstance
} & PropsWithChildren

export type I18nContextType = {
    language: string,
    setLanguage: (language: string) => void
    i18next: I18nextInstance
    label: (key: string, args?: {}) => string
}

export const I18nContext = createContext<I18nContextType | undefined>(undefined)


function matchLoader(loaders: TranslationLoaders, language: string) {

    const trans = Object.entries(loaders).sort((a, b) => {
        const lang1 = a[0]
        const lang2 = b[0]
        return lang2.length - lang1.length
    }).find(([loaderLanguage, loader]) => {


        //zh, zh_TW, zh_TW#han
        let lang = language.toLocaleLowerCase()

        //fixed string zh, zh_TW, zh_CN
        const lolang = loaderLanguage.toLocaleLowerCase()

        if (lang.startsWith(lolang)) {
            while (lang && lang !== lolang) {
                const idx1 = lang.lastIndexOf("_")
                const idx2 = lang.lastIndexOf("-")
                const idx3 = lang.lastIndexOf("#")
                const idx = Math.max(idx1, idx2, idx3)
                if (idx >= 0) {
                    lang = lang.substring(0, idx)
                }
            }
            if (lang === lolang) {
                return loader
            }
        }
    })
    return trans?.[1]
}


function handleLabel(i18: I18nextInstance, key: string, args: any = {}) {
    const { returnObjects, ...other } = args
    const val = i18.t(key, { returnObjects: true, ...other }) as any
    if (returnObjects || typeof val === 'string') {
        return val
    }
    return val['@'] || `[key:${key}]`
}

export default function I18nProvider({ fallbackLanguage, language, translationLoaders, i18nextInstance, children }: I18nProviderProps) {

    const i18next = useMemo(() => {
        const i18next = i18nextInstance || i18nextDefault.createInstance()

        if (!i18next.isInitialized) {
            i18next.init({
                //fix
                //i18next::pluralResolver: Your environment seems not to be Intl API compatible, 
                //use an Intl.PluralRules polyfill. Will fallback to the compatibilityJSON v3 format handling
                compatibilityJSON: 'v3',

                lng: language,
                fallbackLng: fallbackLanguage,

                returnObjects: true,
                missingKeyNoValueFallbackToKey: false,
                interpolation: {
                    escapeValue: false // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
                }
            })
        }
        let loader = matchLoader(translationLoaders, language)
        if (loader) {
            const translation = loader()
            i18next.addResourceBundle(language, 'translation', translation, false, true)
        }
        if (fallbackLanguage && fallbackLanguage !== language) {
            loader = matchLoader(translationLoaders, fallbackLanguage)
            if (loader) {
                const translation = loader()
                i18next.addResourceBundle(fallbackLanguage, 'translation', translation, false, true)
            }
        }

        return i18next
    }, [fallbackLanguage, language, translationLoaders, i18nextInstance])

    const [stateLanguage, setStateLanguage] = useState<string>(language as string)

    const setLanguage = useCallback((language: string) => {
        const loader = matchLoader(translationLoaders, language)
        if (loader) {
            const translation = loader()
            i18next.addResourceBundle(language, 'translation', loader(), false, true)
        }
        i18next.changeLanguage(language)
        setStateLanguage(language)
    }, [i18next, translationLoaders])

    const label = useCallback((key: string, args?: {}) => {
        return handleLabel(i18next, key, args)
    }, [i18next])

    const value = useMemo(() => {
        return { language: stateLanguage, setLanguage, label, i18next } as I18nContextType
    }, [stateLanguage, setLanguage, label, i18next])

    return <I18nContext.Provider value={value} >
        {children}
    </I18nContext.Provider>
}