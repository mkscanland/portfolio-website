<script setup>
import { ref, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import {
  CollapsibleContent,
  CollapsibleRoot,
  CollapsibleTrigger,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuRoot,
  NavigationMenuTrigger,
} from 'reka-ui'

const route = useRoute()
const menuOpen = ref(false)
const openMenu = ref('')

// In-app navigation no longer reloads the page, so close the menus after it.
watch(
  () => route.fullPath,
  () => {
    menuOpen.value = false
    openMenu.value = ''
  },
)
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
    <CollapsibleRoot v-model:open="menuOpen" class="container-fluid">
      <a class="navbar-brand">Matthew Scanland</a>
      <CollapsibleTrigger
        class="navbar-toggler"
        aria-controls="navbarNavDropdown"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </CollapsibleTrigger>
      <div id="navbarNavDropdown" class="collapse navbar-collapse" :class="{ show: menuOpen }">
        <CollapsibleContent force-mount as-child>
          <!-- Wide-screen hover opening stays in site.css; Reka handles click, keyboard, and dismissal. -->
          <NavigationMenuRoot
            v-model="openMenu"
            as="div"
            class="nav-menu-root"
            disable-hover-trigger
            disable-pointer-leave-close
          >
            <NavigationMenuList class="navbar-nav">
              <NavigationMenuItem class="nav-item">
                <NavigationMenuLink as-child>
                  <RouterLink class="nav-link active" to="/">Home</RouterLink>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem value="resume" class="nav-item dropdown">
                <NavigationMenuTrigger
                  class="nav-link dropdown-toggle"
                  :class="{ show: openMenu === 'resume' }"
                >
                  Resume
                </NavigationMenuTrigger>
                <NavigationMenuContent
                  force-mount
                  class="dropdown-menu"
                  :class="{ show: openMenu === 'resume' }"
                >
                  <NavigationMenuLink class="dropdown-item" href="/files/Scanland-Matthew_Resume.pdf">
                    Resume (pdf)
                  </NavigationMenuLink>
                  <NavigationMenuLink class="dropdown-item" href="/files/Scanland-Matthew_Resume.docx">
                    Resume (docx)
                  </NavigationMenuLink>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem value="portfolio" class="nav-item dropdown">
                <NavigationMenuTrigger
                  class="nav-link dropdown-toggle"
                  :class="{ show: openMenu === 'portfolio' }"
                >
                  Portfolio
                </NavigationMenuTrigger>
                <NavigationMenuContent
                  force-mount
                  class="dropdown-menu"
                  :class="{ show: openMenu === 'portfolio' }"
                >
                  <NavigationMenuLink as-child>
                    <RouterLink class="dropdown-item" to="/appraisals">Digital Appraisals Platform</RouterLink>
                  </NavigationMenuLink>
                  <NavigationMenuLink as-child>
                    <RouterLink class="dropdown-item" to="/rulesengine">Rules Engine / Self Service</RouterLink>
                  </NavigationMenuLink>
                  <div class="dropdown-divider"></div>
                  <h6 class="dropdown-header">Earlier Work</h6>
                  <NavigationMenuLink as-child>
                    <RouterLink class="dropdown-item" to="/rebuild">Internal Website Rebuild</RouterLink>
                  </NavigationMenuLink>
                  <NavigationMenuLink as-child>
                    <RouterLink class="dropdown-item" to="/randomforest">Random Forest</RouterLink>
                  </NavigationMenuLink>
                  <NavigationMenuLink as-child>
                    <RouterLink class="dropdown-item" to="/validations">Lab Validations</RouterLink>
                  </NavigationMenuLink>
                  <NavigationMenuLink as-child>
                    <RouterLink class="dropdown-item" to="/webapps">Other Web Apps</RouterLink>
                  </NavigationMenuLink>
                  <NavigationMenuLink as-child>
                    <RouterLink class="dropdown-item" to="/itsystems">IT Systems</RouterLink>
                  </NavigationMenuLink>
                  <NavigationMenuLink class="dropdown-item" href="https://github.com/mkscanland">
                    GitHub
                  </NavigationMenuLink>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem value="guides" class="nav-item dropdown">
                <NavigationMenuTrigger
                  class="nav-link dropdown-toggle"
                  :class="{ show: openMenu === 'guides' }"
                >
                  Guides
                </NavigationMenuTrigger>
                <NavigationMenuContent
                  force-mount
                  class="dropdown-menu"
                  :class="{ show: openMenu === 'guides' }"
                >
                  <NavigationMenuLink class="dropdown-item" href="/files/Azure-Data-Lake-Plan_Public Copy.pdf">
                    Azure Data Lake Creation
                  </NavigationMenuLink>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem value="contact" class="nav-item dropdown">
                <NavigationMenuTrigger
                  class="nav-link dropdown-toggle"
                  :class="{ show: openMenu === 'contact' }"
                >
                  Contact
                </NavigationMenuTrigger>
                <NavigationMenuContent
                  force-mount
                  class="dropdown-menu"
                  :class="{ show: openMenu === 'contact' }"
                >
                  <NavigationMenuLink class="dropdown-item" href="https://www.linkedin.com/in/matthew-scanland/">
                    LinkedIn
                  </NavigationMenuLink>
                  <NavigationMenuLink class="dropdown-item" href="mailto:mkscanland@gmail.com">
                    Email
                  </NavigationMenuLink>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenuRoot>
        </CollapsibleContent>
      </div>
    </CollapsibleRoot>
  </nav>
</template>
