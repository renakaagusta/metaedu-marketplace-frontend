type OpenGraphType = {
  siteName: string;
  description: string;
  templateTitle?: string;
  logo?: string;
};
// !STARTERCONF This OG is generated from https://github.com/theodorusclarence/og
// Please clone them and self-host if your site is going to be visited by many people.
// Then change the url and the default logo.
export function openGraph({
  siteName,
  templateTitle,
  description,
  // !STARTERCONF Or, you can use my server with your own logo.
  logo = 'https://og.<your-domain>/images/logo.jpg',
}: OpenGraphType): string {
  const ogLogo = encodeURIComponent(logo);
  const ogSiteName = encodeURIComponent(siteName.trim());
  const ogTemplateTitle = templateTitle
    ? encodeURIComponent(templateTitle.trim())
    : undefined;
  const ogDesc = encodeURIComponent(description.trim());

  return `https://og.<your-domain>/api/general?siteName=${ogSiteName}&description=${ogDesc}&logo=${ogLogo}${ogTemplateTitle ? `&templateTitle=${ogTemplateTitle}` : ''
    }`;
}

export const getFromLocalStorage = (key: string): string | null => {
  if (typeof window !== 'undefined') {
    return window.localStorage.getItem(key);
  }
  return null;
}

export const getFromSessionStorage = (key: string): string | null => {
  if (typeof sessionStorage !== 'undefined') {
    return sessionStorage.getItem(key);
  }
  return null;
}

export const getRpcErrorMessage = (err: Error): string => {
  const open = (err as Error).stack?.indexOf('{')

  if (!open) {
    return 'Failed to call contract function'
  }

  const close = (err as Error).stack?.lastIndexOf('}')

  if (!close) {
    return 'Failed to call contract function'
  }

  let errorString = (err as Error).stack?.substring(open, close + 1)

  if (!errorString) {
    return 'Failed to call contract function'
  }

  if (errorString?.indexOf('error=')) {
    errorString = errorString.split('error=')[1]
  }

  const errorObject = JSON.parse(errorString)

  if (!errorObject) {
    return 'Failed to call contract function'
  }

  let reason = errorObject.data.message

  if (reason.indexOf(`'`)) {
    reason = reason.split(`'`)[1].replace(`'`, '')
  }

  return reason
}

export const getBase64OfFile = (file: File) => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result);
  reader.onerror = reject;
});