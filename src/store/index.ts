import { createPinia } from "pinia";
import piniaPersist from "pinia-plugin-persist";
const store = createPinia();
store.use(piniaPersist);

export { store };
