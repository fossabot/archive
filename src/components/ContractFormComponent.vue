<template>
  <div>
    <QForm
      ref="contractForm"
      class="q-gutter-md"
      autocapitalize="off"
      autocomplete="off"
      spellcheck="true"
      greedy
      autofocus
      @submit="onSubmit"
      @reset="onResetForm"
    >
      <QSelect
        v-model="contractType"
        :options="contractOptions"
        :label="$t('contract.type')"
        :hint="
          $q.platform.is.mobile
            ? $t('contract.hint.mobile')
            : $t('contract.hint.desktop')
        "
        :behavior="$q.platform.is.ios ? 'dialog' : 'menu'"
        :rules="[(val) => val && val.length > 0]"
        :error-message="$t('contract.rules')"
        popup-content-class="q-pt-sm"
        new-value-mode="add-unique"
        input-debounce="50"
        name="contractType"
        autocomplete="on"
        spellcheck="false"
        color="secondary"
        use-input
        lazy-rules
        hide-selected
        :hide-bottom-space="!$q.platform.is.desktop"
        fill-input
        outlined
        square
        @filter="filterOptions"
      >
        <template #prepend>
          <QIcon name="assignment" />
        </template>
      </QSelect>
      <QInput
        v-model.trim="customer"
        :label="$t('customer.type')"
        :hint="$t('customer.hint')"
        :rules="[(val) => val && val.length > 0]"
        :error-message="$t('customer.rules')"
        autocomplete="on"
        name="customer"
        type="text"
        spellcheck="true"
        :hide-bottom-space="!$q.platform.is.desktop"
        :hide-hint="!$q.platform.is.desktop"
        outlined
        lazy-rules
        square
        color="secondary"
        @focus="onFocusInput"
      >
        <template #prepend>
          <QIcon name="assignment_ind" />
        </template>
      </QInput>
      <QInput
        v-model.trim="email"
        :label="$t('customer.email')"
        :hint="$t('customer.hintEmail')"
        :rules="email ? ['email'] : []"
        autocomplete="off"
        type="email"
        name="email"
        spellcheck="false"
        lazy-rules
        :error-message="$t('consumer.emailRules')"
        :hide-hint="!$q.platform.is.desktop"
        :hide-bottom-space="!$q.platform.is.desktop"
        outlined
        square
        color="secondary"
        @focus="onFocusInput"
      >
        <template #prepend>
          <QIcon name="email" />
        </template>
      </QInput>
      <div class="row justify-center items-center">
        <QInput
          v-if="!$q.platform.is.mobile"
          v-model="duration.from"
          :label="$t('duration.from')"
          class="col no-padding"
          :type="typeof duration.from === 'string' ? 'text' : 'date'"
          :rules="typeof duration.from === 'string' ? ['date'] : []"
          mask="date"
          outlined
          square
          color="secondary"
        >
          <QTooltip>{{ $t('duration.fromHint') }}</QTooltip>
        </QInput>
        <QBtnDropdown
          v-if="$q.platform.is.mobile"
          square
          outline
          cover
          no-wrap
          no-icon-animation
          color="grey-6"
          class="my-dropdown col"
        >
          <template v-if="$q.platform.is.mobile" #label>
            <div class="row no-wrap">
              <QIcon left name="event" color="grey-6" />
              <span class="text-caption text-grey-8">
                {{ duration.from }}
                <template v-if="!dateNoLimit && duration.from !== duration.to">
                  - {{ duration.to }}
                </template>
              </span>
            </div>
            <QSeparator vertical spaced inset />
            <QToggle
              v-model="dateNoLimit"
              checked-icon="hourglass_disabled"
              unchecked-icon="date_range"
              size="lg"
            />
          </template>
          <template v-if="dateNoLimit">
            <QDate
              v-model="duration.from"
              default-view="Calendar"
              :class="
                $q.platform.is.mobile ? 'fullscreen full-width full-height' : ''
              "
              first-day-of-week="1"
              @update:model-value="onSelectDate"
            >
              <div class="row items-center justify-end">
                <QBtn
                  v-close-popup
                  :label="$t('duration.close')"
                  color="primary"
                  flat
                />
              </div>
            </QDate>
          </template>
          <template v-else>
            <QDate
              v-model="duration"
              default-view="Months"
              first-day-of-week="1"
              :class="{
                'fullscreen full-width full-height': $q.platform.is.mobile,
              }"
              range
              @update:model-value="onSelectDate"
            >
              <div class="row items-center justify-end">
                <QBtn
                  v-close-popup
                  :label="$t('duration.close')"
                  color="primary"
                  flat
                />
              </div>
            </QDate>
          </template>
        </QBtnDropdown>
        <QInput
          v-if="!$q.platform.is.mobile"
          v-model="duration.to"
          :type="typeof duration.to === 'string' ? 'text' : 'date'"
          :rules="typeof duration.to === 'string' ? ['date'] : []"
          :label="$t('duration.to')"
          :readonly="dateNoLimit"
          class="col no-padding"
          mask="date"
          outlined
          square
          color="secondary"
        >
          <QTooltip v-if="!dateNoLimit">{{ $t('duration.toHint') }}</QTooltip>
          <QSeparator v-if="!dateNoLimit" vertical spaced inset />
          <QToggle
            v-if="!$q.platform.is.mobile"
            v-model="dateNoLimit"
            color="secondary"
            class="non-selectable"
            :class="{
              'text-grey-14': !dateNoLimit,
              'text-secondary': dateNoLimit,
            }"
            :label="$t('duration.infinity')"
          >
            <QTooltip>{{ $t('duration.noLimit') }}</QTooltip>
          </QToggle>
        </QInput>
      </div>
      <QFile
        v-model="files"
        :label="$t('files.type')"
        :counter="!!files.length"
        accept="image/png, image/jpeg, .pdf"
        color="secondary"
        :hide-hint="!$q.platform.is.desktop"
        :hide-bottom-space="!$q.platform.is.desktop"
        :hint="$t('files.hint')"
        outlined
        multiple
        square
      >
        <template #prepend>
          <QIcon name="attach_file" />
        </template>
        <template #append>
          <QIcon name="add" @click.stop />
        </template>
        <QTooltip>{{ $t('files.hint') }}</QTooltip>
      </QFile>
      <QInput
        v-model.trim="description"
        :label="$t('description.type')"
        :hint="$t('description.hint')"
        type="textarea"
        class="no-padding"
        color="primary"
        :hide-hint="!$q.platform.is.desktop"
        hide-bottom-space
        outlined
        square
        autogrow
        @focus="onFocusInput"
      >
        <template #prepend>
          <QIcon name="sticky_note_2" />
        </template>
      </QInput>
      <div class="text-left">
        <QBtn
          ripple
          square
          stretch
          :class="{
            'full-width': !$q.platform.is.desktop,
          }"
          :label="$t('contractForm.submit')"
          icon-right="save"
          type="submit"
          color="accent"
          :loading="loadingForm"
          :disable="loadingForm"
        />
      </div>
    </QForm>
  </div>
</template>

<script lang="ts" setup>
import { PropType, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import {
  useQuasar,
  date,
  QForm,
  QBtnDropdown,
  QSelect,
  QSeparator,
  QBtn,
  QIcon,
  QInput,
  QDate,
  QTooltip,
  QToggle,
  QFile,
} from 'quasar'
import { storeToRefs } from 'pinia'
import useAuthStore from 'stores/auth'
import useContractStore from 'stores/contract'
import useProfileStore from 'stores/profile'
import { readFilesPromise } from '../helpers/fileHelper'
import { formatDate } from '../helpers/dateHelper'

interface Duration {
  from: Date | string
  to: Date | string
}

const emit = defineEmits(['onCreate'])
const props = defineProps({
  contractTypeName: {
    type: String as PropType<string>,
    default: '',
  },
})

const $t = useI18n().t
const $q = useQuasar()
const authStore = useAuthStore()
const contractStore = useContractStore()
const profileStore = useProfileStore()

const now = new Date()
const afterYearDate = new Date(now.setFullYear(now.getFullYear() + 1))

const { isLoggedIn } = storeToRefs(authStore)
const contractType = ref(props.contractTypeName)
const customer = ref('')
const email = ref('')
const description = ref('')
const duration = ref<Duration>({
  from: $q.platform.is.mobile ? formatDate(new Date()) : new Date(),
  to: $q.platform.is.mobile ? formatDate(afterYearDate) : afterYearDate,
})
const files = ref([])
const contractOptions = ref(contractStore.getArchiveKeys)
const contractForm = ref<QForm>()
const dateNoLimit = ref(false)
const loadingForm = ref(false)

function filterOptions(val: string, update: (callback: () => void) => void) {
  update(() => {
    const needle = val.toLowerCase()
    contractOptions.value = contractStore.getArchiveKeys.filter(
      (v: string) => v.toLowerCase().indexOf(needle) > -1,
    )
  })
}

function resetForm() {
  const contractFormValue = contractForm.value
  contractFormValue.resetValidation()
  contractType.value = ''
  customer.value = ''
  description.value = ''
  email.value = ''
  duration.value = {
    from: $q.platform.is.mobile ? formatDate(new Date()) : new Date(),
    to: $q.platform.is.mobile ? formatDate(afterYearDate) : afterYearDate,
  }
  files.value = []
  dateNoLimit.value = false
}

function onResetForm(confirm = false) {
  if (confirm) {
    const dialog = $q.dialog({
      message: $t('components.contractForm.resetDialog.message'),
      cancel: true,
      persistent: true,
    })
    dialog.onOk(() => {
      resetForm()
    })
    return
  }
  resetForm()
}

function onSelectDate(value: string | Duration) {
  if (value === null) {
    $q.notify({
      type: 'warning',
      message: $t('components.contractForm.selectDate.fail'),
    })
    duration.value = { from: new Date(), to: afterYearDate }
    return
  }
  switch (typeof value) {
    case 'string': {
      duration.value = {
        from: date.isValid(value) ? formatDate(new Date(value)) : null,
        to: date.isValid(value) ? formatDate(new Date(value)) : null,
      }
      break
    }
    case 'object': {
      duration.value = {
        from: date.isValid(String(value.from))
          ? formatDate(new Date(value.from))
          : null,
        to: date.isValid(String(value.to))
          ? formatDate(new Date(value.to))
          : null,
      }
      break
    }
    default: {
      $q.notify({
        type: 'warning',
        message: $t('components.contractForm.wrongDate.fail'),
      })
      break
    }
  }
}

function onFocusInput({ target }: { target: HTMLElement }) {
  target.scrollIntoView()
}

async function onSubmit() {
  if (!date.isValid(String(duration.value.from))) {
    $q.notify({
      type: 'negative',
      message: $t('components.contractForm.submitDate.invalidStartDate'),
    })
    return
  }
  if (!dateNoLimit.value && !date.isValid(String(duration.value.to))) {
    $q.notify({
      type: 'negative',
      message: $t('components.contractForm.submitDate.invalidEndDate'),
    })
    return
  }
  const startDate: Date =
    typeof duration.value.from === 'string'
      ? new Date(duration.value.from)
      : duration.value.from
  const endDate: Date =
    typeof duration.value.to === 'string'
      ? new Date(duration.value.to)
      : duration.value.to
  if (startDate.valueOf() >= endDate.valueOf()) {
    $q.notify({
      type: 'negative',
      message: $t('components.contractForm.submitDate.invalidSelectDate'),
    })
    return
  }
  loadingForm.value = true

  // Если дата совпадает с текущей, то считаем что договор подписан сегодняшним числом
  if (date.getDateDiff(startDate, new Date(), 'days') === 0) {
    const now = new Date()
    startDate.setHours(now.getHours())
    startDate.setMinutes(now.getMinutes())
    startDate.setSeconds(now.getSeconds())
    startDate.setMilliseconds(now.getMilliseconds())
  } else {
    // todo если же договор подписан прошедшим числом, тогда как-то получить его часы, минуты, секунды...
    // иначе упадет ошибка при создании на Pod, если таких договоров будет два
  }

  try {
    const images = await readFilesPromise(files.value)
    const person = profileStore.getPersonLD
    const newContract = {
      agent_name: person.name,
      agent_email: person.email,
      participant_name: customer.value,
      participant_email: email.value,
      instrument_name: contractType.value,
      instrument_description: description.value,
      startTime: startDate,
      endTime: dateNoLimit.value ? null : endDate,
      images: images,
    }
    await contractStore.addContract({
      contractData: newContract,
      usePod: isLoggedIn.value,
    })
    $q.notify({
      message: $t('components.contractForm.submitDate.success', {
        id: newContract.instrument_name.toLocaleLowerCase(),
      }),
      type: 'positive',
      actions: [
        {
          label: $t('components.contractForm.submitDate.redirect'),
          color: 'white',
          handler() {
            emit('onCreate', newContract.instrument_name)
          },
        },
      ],
    })
    onResetForm()
  } catch (error) {
    console.error(error)
    $q.notify({
      type: 'negative',
      message: $t('components.contractForm.submitDate.fail'),
    })
  } finally {
    loadingForm.value = false
  }
}

defineExpose({
  resetForm: onResetForm,
})
</script>
<style lang="scss">
.my-dropdown .q-btn__content.col {
  justify-content: space-between;
}
</style>
