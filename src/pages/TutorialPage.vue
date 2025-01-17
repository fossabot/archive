<template>
  <QPage :class="$q.dark.isActive ? 'bg-transparent' : 'bg-grey-1'">
    <QScrollArea ref="scroll" visible class="absolute-full fit">
      <QStepper
        ref="stepper"
        v-model.number="step"
        color="primary"
        flat
        alternative-labels
        contracted
        :swipeable="false"
        :animated="!$q.platform.is.desktop"
        :vertical="!$q.platform.is.desktop"
        class="q-pa-md q-card--bordered q-ml-auto q-mr-auto q-mt-md q-mb-md"
        :class="{
          'no-margin': $q.platform.is.mobile,
          'no-padding': $q.platform.is.mobile,
        }"
        :style="{
          'max-width': $q.platform.is.desktop ? '720px' : 'auto',
        }"
        :transition-next="$q.platform.is.desktop ? 'slide-left' : 'slide-down'"
        @update:model-value="onStep"
      >
        <QStep
          :name="STEP.WELCOME"
          :title="$t('tutorial.welcome.title')"
          icon="create_new_folder"
          done-color="positive"
          :done="step > STEP.WELCOME"
        >
          <QIcon
            class="flex q-ml-auto q-mr-auto q-ma-md bg-white rounded-borders"
            name="img:/icons/safari-pinned-tab.svg"
            size="128px"
          />
          <p v-show="$q.platform.is.desktop" class="text-h4 text-center">
            {{ $t('tutorial.welcome.title') }}
          </p>
          <div
            class="text-body1"
            style="white-space: break-spaces"
            v-html="parse($t('tutorial.welcome.body'))"
          ></div>
          <QList class="q-mb-md">
            <QExpansionItem
              :label="$t('tutorial.info.title')"
              icon="create_new_folder"
              :dense="$q.platform.is.desktop"
              :dense-toggle="$q.platform.is.desktop"
            >
              <QCard>
                <QCardSection>
                  <div
                    class="text-body1"
                    style="white-space: break-spaces"
                    v-html="parse($t('tutorial.info.body'))"
                  ></div>
                </QCardSection>
              </QCard>
            </QExpansionItem>
            <QExpansionItem
              :label="$t('tutorial.agreement.title')"
              :caption="$t('tutorial.agreement.caption')"
              icon="article"
              :dense="$q.platform.is.desktop"
              :dense-toggle="$q.platform.is.desktop"
            >
              <QCard>
                <QCardSection>
                  <div
                    class="text-body1"
                    style="white-space: break-spaces"
                    v-html="parse($t('tutorial.agreement.body'))"
                  >
                  </div>
                </QCardSection>
              </QCard>
            </QExpansionItem>
          </QList>
          <QStepperNavigation>
            <QBtn
              color="secondary"
              :label="$t('tutorial.welcome.ok')"
              :class="{
                'full-width': !$q.platform.is.desktop,
              }"
              @click="$refs.stepper.next()"
            />
          </QStepperNavigation>
        </QStep>
        <QStep
          :name="STEP.WALLET"
          :title="$t('tutorial.wallet.title')"
          :caption="$t('tutorial.wallet.caption')"
          done-color="positive"
          icon="assignment"
          class="q-pb-md"
          :done="step > STEP.WALLET"
        >
          <p v-show="$q.platform.is.desktop" class="text-h4">
            {{ $t('tutorial.wallet.title') }}
          </p>
          <div
            class="text-body1"
            style="white-space: break-spaces"
            v-html="parse($t('tutorial.wallet.body'))"
          >
          </div>
          <QStepperNavigation>
            <PhantomWalletLogin
              @skip="onSkipWallet"
              @complete="stepper.next()"
            />
          </QStepperNavigation>
        </QStep>
        <QStep
          :name="STEP.CRYPTO"
          :title="$t('tutorial.crypto.title')"
          :caption="$t('tutorial.crypto.caption')"
          icon="article"
          done-color="positive"
          :done="step > STEP.CRYPTO"
        >
          <p v-show="$q.platform.is.desktop" class="text-h4">
            {{ $t('tutorial.crypto.title') }}
          </p>
          <div
            class="text-body1"
            style="white-space: break-spaces"
            v-html="parse($t('tutorial.crypto.body'))"
          >
          </div>
          <QInput v-if="did" :model-value="did" readonly />
          <QStepperNavigation>
            <template v-if="!did">
              <KeypairComponent @on-key="(key: DIDTable) => (did = key.id)" />
            </template>
            <template v-else>
              <QBtn
                color="secondary"
                :label="$t('tutorial.crypto.ok')"
                :class="{
                  'full-width': !$q.platform.is.desktop,
                }"
                @click="exportKeyPair"
              />
            </template>
          </QStepperNavigation>
        </QStep>
        <QStep
          :name="STEP.OIDC"
          :title="$t('tutorial.oidc.title')"
          :caption="$t('tutorial.oidc.caption')"
          done-color="positive"
          icon="assignment"
          class="q-pb-md"
          :done="step > STEP.OIDC"
        >
          <p v-show="$q.platform.is.desktop" class="text-h4">
            {{ $t('tutorial.oidc.title') }}
          </p>
          <div
            class="text-body1"
            style="white-space: break-spaces"
            v-html="parse($t('tutorial.oidc.body'))"
          >
          </div>
          <OIDCIssuerComponent
            :label="$t('oidc.label')"
            @on-complete="onOnlineAuthorize"
          >
            <QTooltip>{{ $t('oidc.tutorialHint') }}</QTooltip>
          </OIDCIssuerComponent>
        </QStep>
        <QStep
          :name="STEP.FINAL"
          :title="$t('tutorial.data.title')"
          done-color="positive"
          icon="assignment"
          class="q-pb-md"
          :done="step > STEP.FINAL"
        >
          <p v-show="$q.platform.is.desktop" class="text-h4">
            {{ $t('tutorial.data.title') }}
          </p>
          <p class="text-body1">{{ $t('tutorial.data.body') }}</p>
          <QSpace class="q-pa-xs" />
          <QForm
            ref="nameForm"
            class="q-gutter-md q-mt-md"
            autocapitalize="off"
            autocomplete="off"
            autofocus
            greedy
            @submit="onFinish"
          >
            <QInput
              v-model.trim="consumer"
              :label="$t('consumer.type')"
              :rules="[(val) => val && val.length > 3]"
              name="consumer"
              type="text"
              autocomplete="on"
              autofocus
              :error-message="$t('consumer.rules')"
              clearable
              outlined
              no-error-icon
              @focus="(e) => e.target.scrollIntoView()"
            >
              <template #prepend>
                <QIcon name="face" />
              </template>
            </QInput>
            <QInput
              v-model.trim="email"
              :label="$t('consumer.email')"
              name="email"
              type="email"
              :rules="['email']"
              :error-message="$t('consumer.emailRules')"
              autocomplete="off"
              lazy-rules
              clearable
              no-error-icon
              outlined
            >
              <template #prepend>
                <QIcon name="email" />
              </template>
            </QInput>
            <QStepperNavigation class="q-pa-md no-margin">
              <QBtn
                color="accent"
                type="submit"
                square
                :disable="!consumerValid"
                :label="$t('tutorial.data.ok')"
                :class="{
                  'full-width': !$q.platform.is.desktop,
                }"
                :dense="$q.platform.is.desktop"
                :loading="$q.loading.isActive"
                icon="login"
              />
              <PodImporter v-if="isLoggedIn" class="q-ml-md" />
            </QStepperNavigation>
          </QForm>
        </QStep>
      </QStepper>
    </QScrollArea>
  </QPage>
</template>

<script lang="ts" setup>
import { computed, defineAsyncComponent, onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import {
  exportFile,
  QBtn,
  QForm,
  QIcon,
  QCard,
  QCardSection,
  QInput,
  QPage,
  QScrollArea,
  QSpace,
  QStep,
  QStepper,
  QStepperNavigation,
  QTooltip,
  QList,
  QExpansionItem,
  useMeta,
  useQuasar,
} from 'quasar'
import patterns from 'quasar/src/utils/patterns'
import { storeToRefs } from 'pinia'
import useAuthStore from 'stores/auth'
import { demoUserWebId } from 'stores/auth'
import tutorialStore from 'stores/tutorial'
import useContractStore from 'stores/contract'
import useProfileStore from 'stores/profile'
import usePodStore from 'stores/pod'
import useWalletStore from 'stores/wallet'
import pkg from '../../package.json'
import { ROUTE_NAMES } from '../router/routes'
import { parse } from '../helpers/markdownHelper'
import { createContractPDF } from '../helpers/pdfHelper'
import { readFilesPromise } from '../helpers/fileHelper'
import solidAuth from '../services/authService'
import { keyPair } from '../services/databaseService'
import { DIDTable } from '../types/models'

const OIDCIssuerComponent = defineAsyncComponent(
  () => import('components/OIDCIssuerComponent.vue'),
)
const KeypairComponent = defineAsyncComponent(
  () => import('components/KeypairComponent.vue'),
)
const PodImporter = defineAsyncComponent(
  () => import('components/PodImporter.vue'),
)
const PhantomWalletLogin = defineAsyncComponent(
  () => import('components/PhantomWalletLogin.vue'),
)

const $t = useI18n().t
const $q = useQuasar()
const router = useRouter()
const podStore = usePodStore()
const authStore = useAuthStore()
const contractStore = useContractStore()
const profileStore = useProfileStore()
const walletStore = useWalletStore()

enum STEP {
  WELCOME = 1,
  WALLET = 2,
  CRYPTO = 3,
  OIDC = 4,
  FINAL = 5,
}

const stepParam = 'step'

function getCurrentStep() {
  const searchParams = new URLSearchParams(window.location.search)

  if (searchParams.get(stepParam)) {
    return Number(searchParams.get(stepParam))
  }
}

const scroll = ref<InstanceType<typeof QScrollArea> | null>(null)
const stepper = ref<InstanceType<typeof QStepper> | null>(null)
const step = ref(getCurrentStep() ?? STEP.WELCOME)

const did = ref('')
const { isLoggedIn } = storeToRefs(authStore)
const { consumer, email } = storeToRefs(profileStore)
const consumerValid = computed(() => {
  return Boolean(
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
    consumer.value.length > 3 && patterns.testPattern.email(email.value),
  )
})

watch(
  () => step.value,
  (value) => {
    setMeta(value)
  },
)

function setMeta(value: number) {
  switch (value) {
    case STEP.WELCOME: {
      useMeta({
        'title': $t('pages.tutorial.welcome.title'),
        'og:title': $t('pages.tutorial.welcome.title'),
      })
      break
    }
    case STEP.WALLET: {
      useMeta({
        'title': $t('pages.tutorial.wallet.title'),
        'og:title': $t('pages.tutorial.wallet.title'),
      })
      break
    }
    case STEP.CRYPTO: {
      useMeta({
        'title': $t('pages.tutorial.crypto.title'),
        'og:title': $t('pages.tutorial.crypto.title'),
      })
      break
    }
    case STEP.OIDC: {
      useMeta({
        'title': $t('pages.tutorial.oidc.title'),
        'og:title': $t('pages.tutorial.oidc.title'),
      })
      break
    }
    case STEP.FINAL: {
      useMeta({
        'title': $t('pages.tutorial.final.title'),
        'og:title': $t('pages.tutorial.final.title'),
      })
      break
    }
    default: {
      useMeta({
        'title': pkg.productName,
        'og:title': pkg.productName,
      })
      break
    }
  }
}

async function onOnlineAuthorize(oidcIssuer: string) {
  if (!oidcIssuer) {
    const dialog = $q.dialog({
      message: $t('components.oidcIssuer.authorizeDialog.message'),
      cancel: true,
      persistent: true,
    })
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    dialog.onOk(() => {
      stepper.value.next()
    })
    return
  }

  $q.loading.show()
  $q.sessionStorage.remove('connect')
  const redirectUrl =
    window.location.origin +
    window.location.pathname +
    `?${stepParam}=` +
    String(step.value)
  try {
    await solidAuth({
      redirectUrl: redirectUrl,
      oidcIssuer: oidcIssuer,
      restorePreviousSession: false,
    })
  } catch (error) {
    console.error(error)
    $q.notify({
      color: 'negative',
      message: $t('components.oidcIssuer.authorizeDialog.fail'),
    })
  } finally {
    $q.loading.hide()
  }
}

function onSkipWallet() {
  const dialog = $q.dialog({
    message: $t('wallet.skipDialog.message'),
    cancel: true,
    persistent: true,
  })
  dialog.onOk(() => {
    stepper.value.next()
  })
}

function exportKeyPair() {
  const dialog = $q.dialog({
    message: $t('components.keypair.export.dialog.message'),
    cancel: true,
    persistent: true,
  })
  dialog.onDismiss(() => {
    stepper.value.next()
  })
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  dialog.onOk(async () => {
    const keysJSON = await keyPair.prepareKeyPair()
    if (keysJSON) {
      const status = exportFile('keys.json', keysJSON)
      if (status) {
        $q.notify({
          type: 'positive',
          message: $t('components.keypair.export.dialog.success'),
        })
      } else {
        $q.notify({
          type: 'warning',
          message: $t('components.keypair.export.dialog.fail'),
        })
      }
    }
  })
}

async function onFinish() {
  $q.loading.show()

  if (!authStore.webId) {
    authStore.webId = demoUserWebId
  }

  try {
    const response = await fetch('docs/privacy.md')
    const md = await response.text()
    const html = parse(md)
    const pdfFile = await createContractPDF(html)
    const contractPDF = await readFilesPromise([pdfFile])
    const newContract = {
      agent_name: consumer.value,
      agent_email: email.value,
      participant_name: pkg.author.name,
      participant_email: pkg.author.email,
      instrument_name: $t('pages.privacy.title'),
      instrument_description: `${pkg.productName}: ${pkg.description} v${pkg.version}`,
      startTime: new Date(),
      images: contractPDF,
    }
    if (isLoggedIn.value) {
      await podStore.initPod()
    }
    await contractStore.addContract({
      contractData: newContract,
      usePod: isLoggedIn.value,
    })
    profileStore.consumerName(consumer.value)
    profileStore.consumerEmail(email.value)
    profileStore.consumerDID(did.value)
    await profileStore.setAvatar(email.value)

    if (isLoggedIn.value) {
      await podStore.setProfileFOAF()
    }

    tutorialStore().tutorialComplete()
    await router.push({
      name: ROUTE_NAMES.FILTER,
      query: {
        name: newContract.instrument_name,
        page: 1,
      },
    })
  } catch (error) {
    console.error(error)
    $q.notify({
      type: 'error',
      color: 'negative',
      message: String(error.message),
      position: 'center',
      progress: false,
      timeout: 99999999999,
    })
  } finally {
    $q.loading.hide()
  }
}

async function onStep(step: number) {
  await router.push({
    query: {
      ...router.currentRoute.value.query,
      step: step,
    },
    replace: true,
  })
  scroll.value.setScrollPosition('vertical', step * 30, 100)
}

setMeta(step.value)

onMounted(() => {
  const { query } = router.currentRoute.value

  // Если пользователь отменил вход через WebId, возвращаем его на страницу подтверждения
  if (query.error === 'access_denied') {
    step.value = STEP.FINAL
  }
  if (isLoggedIn.value) {
    step.value = STEP.FINAL
  }
  if (
    step.value > Number(STEP.WALLET) &&
    walletStore.getMultibase?.length === 0
  ) {
    step.value = STEP.WALLET
  }
  if (isLoggedIn.value && query.code && query.state) {
    step.value = STEP.FINAL
  }
})
</script>
