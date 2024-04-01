import Handlebars from 'handlebars';

export function registerPartials(templates: Record<string, string>) {
  Object
    .entries(templates)
    .forEach(([name, temp]) => {
      Handlebars.registerPartial(name, temp);
    });
}
