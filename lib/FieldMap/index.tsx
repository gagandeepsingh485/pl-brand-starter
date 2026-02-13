import config from "@/publive.config";

interface Component {
  schema_id: string;
  schema_slug: string;
  dynamic_fields: Record<string, any>[];
}

export const StaticLayoutRender = ({
  components,
}: {components: Component[]}) => {
  if (!components || components.length === 0) return null;
  return (
    components.map((component, index) => {
      const ComponentConfig = config.componentMap[component?.schema_slug];
      const Component = ComponentConfig?.component || null;
      if (!Component) return null;
      return (
        <Component key={component.schema_id + "_" + index} {...component.dynamic_fields?.[0]} />
      )
    })
  )
}
