export class BaseController {
  constructor(appNode) {
    if (!appNode) {
      throw new Error("Invalid app node given");
    }

    this.appNode = appNode;
  }

  loadTemplate(templateId) {
    const templateNode = document.getElementById(templateId);
    if (!templateNode) {
      throw new Error(`Template with id "${templateId}" not found`);
    }
    return Handlebars.compile(templateNode.innerHTML);
  }
}
