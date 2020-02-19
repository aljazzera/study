window.addEventListener('DOMContentLoaded', function () {

    function Timer() {
        let timeDay = document.querySelector('#time-day'),
            timeWeek = document.querySelector('#time-week'),
            timeCurrent = document.querySelector('#time-current'),
            timeNewYear = document.querySelector('#time-newyear');
        let dateNow = new Date();

        function getDayOf(date) {
            if (date.getHours() >= 6 && date.getHours() < 12) {
                return "Доброго Утра!";
            } else if (date.getHours() >= 12 && date.getHours() < 17) {
                return "Добрый День!";
            } else if (date.getHours() >= 17 && date.getHours() < 23) {
                return "Добрый Вечер!";
            } else {
                return "Доброй Ночи!";
            }
        }

        function getWeekDay(date) {
            let days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];

            return days[date.getDay()];
        }

        function getCurrentTime(date) {
            let current = ('0' + date.getHours()).slice(-2) + ":" + ('0' + date.getMinutes()).slice(-2) + ":" + ('0' + date.getSeconds()).slice(-2) + " " + ('0' + date.getDate()).slice(-2) + '.' + ('0' + (date.getMonth() + 1)).slice(-2) + '.' + date.getFullYear();
            return current;
        }

        function getTimeNewYear(date) {
            let dateNewYear = new Date('01, 01, 2021').getTime(),
                countDay = Math.floor(((dateNewYear - date.getTime()) / 1000) / 60 / 60 / 24);
            return countDay;
        }

        timeDay.textContent = getDayOf(dateNow);
        timeWeek.textContent = getWeekDay(dateNow);
        timeCurrent.textContent = getCurrentTime(dateNow);
        timeNewYear.textContent = getTimeNewYear(dateNow);

    }

    Timer();

});