module.exports = {
    checkUrl: (str) => {
        main = 0
        regexp =  /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[A-z\u00a1-\uffff0-9]-*)*[A-z\u00a1-\uffff0-9]+)(?:\.(?:[A-z\u00a1-\uffff0-9]-*)*[A-z\u00a1-\uffff0-9]+)*(?:\.(?:[A-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
 
        str = str.replace(/\n/g, " ")
        str = str.replace(/\\n/g, '') 
        str = str.replace(/\r?\n|\r/, '')
        str = str.replace(/[\r\n]+/g, '\n');

        let a = str.split(' ')
        let b = str.split('_')
        let c = str.split('-')
        let d = str.split('.')
        let e = str.split(',')  
        let u = str.split('\n')  

        for(i in a) {
            if(regexp.test(a[i])) {
                main += Number(1)
            }
        }

        for(i in b) {
            if(regexp.test(b[i])) {
                main += Number(1)
            }
        }

        for(i in c) {
            if(regexp.test(c[i])) {
                main += Number(1)
            }
        }

        for(i in d) {
            if(regexp.test(d[i])) {
                main += Number(1)
            }
        }

        for(i in e) {
            if(regexp.test(e[i])) {
                main += Number(1)
            }
        }

        for(i in u) {
            if(regexp.test(u[i])) {
                main += Number(1)
            }
        }

        if(main == 0) return false
        else return true
    }
};