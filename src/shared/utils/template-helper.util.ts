import { TemplateData } from '../types/notification.types';

export function renderTemplate(template: string, data: TemplateData): string {
  return template.replace(/\{\{(\w+)\}\}/g, (_, key) => `${data[key] || ''}`);
}
