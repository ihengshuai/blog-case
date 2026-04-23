import { defineComponent } from "vue";
import { RouterLink } from "vue-router";

import IPanel from "@/components/common/panel";

const HomePage = defineComponent({
  name: "HomePage",
  setup() {
    return () => (
      <IPanel>
        Current HomePage
        <hr />
        <RouterLink to="/about">go about page</RouterLink>
      </IPanel>
    );
  },
});

export default HomePage;
