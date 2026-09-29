<script setup>
import { ref, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import {
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

function closeMenus() {
  menuOpen.value = false
  openMenu.value = ''
}

function closeMenusOnLink(event) {
  if (event.target.closest('a')) closeMenus()
}

watch(() => route.fullPath, closeMenus)
</script>

<template>
  <nav
    class="navbar navbar-expand-lg navbar-dark bg-dark sticky top-0 z-[1020]"
    @click="closeMenusOnLink"
  >
    <CollapsibleRoot v-model:open="menuOpen" class="container-fluid">
      <a class="navbar-brand">Matthew Scanland</a>
      <CollapsibleTrigger
        class="navbar-toggler"
        aria-controls="navbarNavDropdown"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </CollapsibleTrigger>
      <div id="navbarNavDropdown" class="navbar-collapse" :class="{ show: menuOpen }">
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
              <NavigationMenuLink as-child :active="route.path === '/'">
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
                <NavigationMenuLink as-child :active="route.path === '/appraisals'">
                  <RouterLink class="dropdown-item" to="/appraisals">Digital Appraisals Platform</RouterLink>
                </NavigationMenuLink>
                <NavigationMenuLink as-child :active="route.path === '/rulesengine'">
                  <RouterLink class="dropdown-item" to="/rulesengine">Rules Engine / Self Service</RouterLink>
                </NavigationMenuLink>
                <div class="dropdown-divider"></div>
                <h6 class="dropdown-header">Earlier Work</h6>
                <NavigationMenuLink as-child :active="route.path === '/rebuild'">
                  <RouterLink class="dropdown-item" to="/rebuild">Internal Website Rebuild</RouterLink>
                </NavigationMenuLink>
                <NavigationMenuLink as-child :active="route.path === '/randomforest'">
                  <RouterLink class="dropdown-item" to="/randomforest">Random Forest</RouterLink>
                </NavigationMenuLink>
                <NavigationMenuLink as-child :active="route.path === '/validations'">
                  <RouterLink class="dropdown-item" to="/validations">Lab Validations</RouterLink>
                </NavigationMenuLink>
                <NavigationMenuLink as-child :active="route.path === '/webapps'">
                  <RouterLink class="dropdown-item" to="/webapps">Other Web Apps</RouterLink>
                </NavigationMenuLink>
                <NavigationMenuLink as-child :active="route.path === '/itsystems'">
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
      </div>
    </CollapsibleRoot>
  </nav>
</template>
