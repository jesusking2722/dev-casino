export const changeMessageToICU = (message: string) => message.replace(/:(\w+)/g, '{$1}')

// Translations from Laravel cannot be interpolated by next-intl, because dynamic values are not in ICU format
// Message is value from useTranslations, variable is an object with dynamic values

/*
* Example:
*
* const message = useTranslations('auth.login')
*
* const interpolatedMessage = interpolateMessage(message, {email: 'test'})
*
* */

export const interpolateMessage = (message: string, variables: Record<string, string>) => message.replace(/:(\w+)/g, (_, key) => variables[key])