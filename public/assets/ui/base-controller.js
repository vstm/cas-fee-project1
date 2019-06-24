const VIEW_SETTINGS_KEY = 'view-settings';

export class BaseController {
  constructor(appNode) {
    if (!appNode) {
      throw new Error("Invalid app node given");
    }

    this.appNode = appNode;
    this.viewSettings = this.loadViewSettings();
    this.styles = this.loadStyles();
    if (this.viewSettings.style) {
      this.switchStyle(this.viewSettings.style);
    }
  }

  loadTemplate(templateId) {
    const templateNode = document.getElementById(templateId);
    if (!templateNode) {
      throw new Error(`Template with id "${templateId}" not found`);
    }
    return Handlebars.compile(templateNode.innerHTML);
  }


  loadStyles() {
    const styles = document.querySelectorAll('link[rel="alternate stylesheet"]');
    return [{id: "", title: "Standard"}, ...Array.from(styles).map((stylenode) => ({id: stylenode.id, title: stylenode.title}))]
  }

  saveViewSettings(settings) {
    window.localStorage.setItem(VIEW_SETTINGS_KEY, JSON.stringify(settings));
  }

  loadViewSettings() {
    try {
      const str = window.localStorage.getItem(VIEW_SETTINGS_KEY);

      if (!str) {
        return {};
      }

      return JSON.parse(str);
    } catch (e) {
      console.error(e);
      return {};
    }
  }

  switchStyle(newStyle) {
    const styleNodes = Array.from(document.querySelectorAll('link[rel="alternate stylesheet"]'));

    for(let styleNode of styleNodes) {
      styleNode.disabled = true;
      if (styleNode.id === newStyle) {
        styleNode.disabled = false;
      }
    }
    this.viewSettings.style = newStyle;
  }
}
