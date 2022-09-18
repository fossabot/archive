import {format} from 'quasar'

const {humanStorageSize} = format

export default {
  error404: {
    title: '404',
    description: 'Упс. Здесь пусто...',
    submit: 'Вернуться на главную',
  },
  auth: {
    caption: 'Введите ключ',
  },
  list: {
    explore: 'На главную',
    add: 'Добавить',
    create: 'Создать документ',
  },
  archive: {
    search: 'Поиск по типу договора',
    empty: 'Добавьте ваш первый договор',
    searchEmpty: 'Ничего не найдено. Измените параметры поиска.',
  },
  header: {
    title: 'Мои договоры',
    create: 'Создание',
    archive: 'Архив',
  },
  navigation: {
    version: 'v.',
    title: 'Настройки',
    feedback: {
      label: 'Ваши замечания по продукту',
      tooltip: 'Если Вы нашли ошибку, напишите об этом на почту',
    },
  },
  settings: {
    native: {
      profile: 'Настройки профиля',
      title: 'Настройки базы',
      import: 'Файл импорта базы',
      submit: 'Импорт базы',
      export: 'Экспорт базы',
      otp: 'Настройки входа',
    },
    clean: {
      title: 'Удаление всего',
      label: 'Подтвердите удаление базы',
      ok: 'Удалить',
      cancel: 'Отмена',
      submit: 'Удаление базы',
    }
  },
  contract: {
    rules: 'Пожалуйста, введите тип договора',
    type: 'Тип договора',
    hint: 'Название и номер',
    option: 'Создать новый тип',
  },
  consumer: {
    type: 'Ваше ФИО',
    rules: 'Пожалуйста, введите потребителя',
    save: 'Сохранить',
  },
  customer: {
    rules: 'Пожалуйста, введите заказчика',
    type: 'Исполнитель',
    hint: 'ФИО или ИНН',
  },
  description: {
    type: 'Примечание',
  },
  duration: {
    from: 'Дата подачи заявления',
    to: 'Дата окончания заявления',
    close: 'Закрыть',
    infinity: 'Бессрочный',
  },
  files: {
    type: 'Приложенные файлы',
  },
  contractForm: {
    submit: 'Добавить',
    date: 'Выбрать дату',
  },
  tutorial: {
    info: {
      title: 'Как работает сервис',
      body: 'Сервис фиксирует условия договоренностей в надежном хранилище вашего браузера. \n\nДанные хранятся только на вашем устройстве и не попадают никуда больше. \nПриложение использует внутреннее хранилище браузера IndexDB. Это надежное хранилище, доступ к которому имеете только вы с текущего устройства. Данные необходимы для создания документов.',
      ok: 'Далее',
    },
    agreement: {
      title: 'Пользовательское соглашение',
      body: 'Разработчик не осуществляет сбор любых ваших персональных данных. \nПриложение распространяется "как есть". Исходный код распространяется по лицензии MIT.',
      ok: 'Принять',
    },
    data: {
      title: 'Данные пользователя',
      body: '',
    },
    complete: 'Создать первый договор',
    otp: 'Опционально введите пин код',
  },
  archiveList: {
    remove: 'Удалить',
    edit: 'Редактировать',
    openFile: 'Открыть файл в полном размере',
    shareFile: 'Поделиться документом',
  },
  database: {
    fileSize: 'Выберите файл размером до ' + humanStorageSize(1024 * 1024 * 1024 * 2),
    fileImport: 'Начать процедуру импорта базы данных',
    fileExport: 'Экспортировать базу в файл',
    loading: 'Загрузка...',
    removeDatabase: 'Удалить базу данных',
  },
  searchDialog: {
    searchText: 'Название договора',
    cancel: 'Отмена',
    search: 'Найти',
  },
}
