function trim(str: string, pr?: string): string {
  if (str && !pr) {
    return str.trim();
  }
  return str.replace(new RegExp(`[${pr}]`, 'g'), '');
}

export default trim;
