export type CTA = {
  text: string;
  url: string;
  type: 'default' | 'primary' | 'text';
}

export type DynamicField<T> = {
  schema_id: string;
  schema_slug: string;
  dynamic_fields: T[];
}