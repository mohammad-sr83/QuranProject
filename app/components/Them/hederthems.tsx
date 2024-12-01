
export const changeTheme = (theme: string|null) => {
  if (theme) {
    document.querySelector('html')?.setAttribute("data-theme", theme);
  }
  };
  