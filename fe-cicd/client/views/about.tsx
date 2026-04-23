import { defineComponent } from "vue";
import { RouterLink } from "vue-router";

import IPanel from "@/components/common/panel";

const AboutPage = defineComponent({
  name: "AboutPage",
  setup() {
    return () => (
      <IPanel>
        Current AboutPage
        <hr />
        <RouterLink to="/">go home page</RouterLink>
      </IPanel>
    );
  },
});

export default AboutPage;
