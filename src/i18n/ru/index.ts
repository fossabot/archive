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
      title: 'Настройки базы',
      import: 'Файл импорта базы',
      submit: 'Импорт базы',
      export: 'Экспорт базы',
      otp: 'Настройка входа',
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
    hint: 'ФИО',
    type: 'Потребитель',
    rules: 'Пожалуйста, введите потребителя',
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
    agreement: {
      title: 'Пользовательское соглашение',
      body: 'Разработчик не осуществляет сбор ваших персональных данных. Приложение распространяется "как есть". Исходный код распространяется по лицензии MIT. Разработчик не гарантирует сохранность ваших документов. Разработчик вправе внести изменения конфликтующие с вашими сохраненными документами.',
    },
    data: {
      title: 'Данные пользователя',
      body: 'Приложение использует внутреннее хранилище браузера IndexDB. Это надежное хранилище, доступ к которому имеете только вы с текущего устройства. Данные необходимы для создания документов. Введенные данные хранятся только на вашем устройстве и не попадают никуда больше.',
    },
    complete: 'Создать первый договор',
    otp: 'Опционально введите пин код (будет использовать при входе):',
  },
  archiveList: {
    remove: 'Удалить',
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
