import { defineComponent, PropType } from "vue";
import { ElMenuItem, ElSubMenu } from "element-plus";

interface MenuItem {
  path: string;
  icon: string;
  title: string;
  children?: MenuItem[];
}

function renderMenuItems(menus?: MenuItem[]): Array<JSX.Element> | undefined {
  if (menus && menus.length) {
    return menus.map((item) => {
      if (item.children && item.children.length)
        return (
          <>
            <ElSubMenu
              v-slots={{
                title() {
                  return item.title;
                },
              }}
              index={item.path}
            >
              {renderMenuItems(item.children)}
            </ElSubMenu>
          </>
        );
      return (
        <>
          <ElMenuItem index={item.path}> {item.title} </ElMenuItem>
        </>
      );
    });
  }
}

export default defineComponent({
  props: {
    menus: {
      type: Array as PropType<MenuItem[]>,
      default: [],
    },
  },
  setup(props) {
    return () => <>{renderMenuItems(props.menus)}</>;
  },
});
