const quiz = document.getElementById('quiz');
const questionNumberEl = document.getElementById('question-number');
const questionEl = document.getElementById('question');
const a_text = document.getElementById('a_text');
const b_text = document.getElementById('b_text');
const c_text = document.getElementById('c_text');
const d_text = document.getElementById('d_text');
const submitBtn = document.getElementById('submit');
const prevBtn = document.getElementById('prev');
const shuffleBtn = document.getElementById('shuffle');
const resultDiv = document.getElementById('result');
const scoreEl = document.getElementById('score');
const errorsDiv = document.getElementById('errors');
const correctAnswersDiv = document.getElementById('correct-answers');

let currentQuiz = 0;
let score = 0;
let errors = [];
let userAnswers = [];
let quizCompleted = false;
let quizDataOriginal = [
    {
        question: "Definisi dari DIALOG dalam perancangan user interface adalah",
        a: "Percakapan antara 2 pihak atau lebih",
        b: "Struktur percakapan antara user dengan user lain",
        c: "Struktur percakapan antara user dengan sistem komputer",
        d: "Struktur percakapan antara input dengan sistem komputer",
        correct: "c",
    },
    {
        question: "Bahasa komputer dibagi menjadi 3 tingkatan yaitu",
        a: "Leksikal, Sintaksis, Morfologi",
        b: "Leksikal, Sintaksis, Parser",
        c: "Leksikal, Sintaksis, Semantik",
        d: "Tinggi, Sedang, Rendah",
        correct: "c",
    },
    {
        question: "Dibawah ini termasuk dalam jenis-jenis Dialog yaitu",
        a: "State Transition Network",
        b: "JSD Diagrams",
        c: "Command Language",
        d: "Jawaban benar semua",
        correct: "c",
    },
    {
        question: "Struktur dialog manusia mempunyai sifat yaitu",
        a: "Tidak terstruktur",
        b: "Dipengaruhi emosi, situasi",
        c: "Tidak konsisten",
        d: "Jawaban benar semua",
        correct: "d",
    },
    {
        question: "Struktur dialog pada komputer mempunyai sifat yaitu",
        a: "Terstruktur",
        b: "Terbatas",
        c: "Jawaban salah semua",
        d: "Jawaban benar semua",
        correct: "d",
    },
    {
        question: "Prinsip yang digunakan dalam desain dialog adalah membagi sistem menjadi beberapa bagian yang disebut",
        a: "Modul (module)",
        b: "Diagramatik",
        c: "Dialog Leksikal",
        d: "Jawaban benar semua",
        correct: "a",
    },
    {
        question: "Dalam user interface, dialog umumnya dianggap sinonim/ekuivalen dengan tingkatan",
        a: "Sintaksis",
        b: "Leksikal",
        c: "Semantik",
        d: "Morfologi",
        correct: "a",
    },
    {
        question: "Tingkatan bahasa komputer yang paling rendah adalah",
        a: "Sintaksis",
        b: "Leksikal",
        c: "Semantik",
        d: "Morfologi",
        correct: "b",
    },
    {
        question: "Bentuk icon pada layar, tombol yang bisa ditekan adalah contoh bahasa komputer",
        a: "Sintaksis",
        b: "Leksikal",
        c: "Semantik",
        d: "Morfologi",
        correct: "b",
    },
    {
        question: "Dibawah ini beberapa bentuk notasi diagramatik kecuali:",
        a: "State Transition Network",
        b: "JSD Diagrams",
        c: "Command Language",
        d: "Flowcharts",
        correct: "c",
    },
    {
        question: "Prinsip dalam perancangan dialog yaitu:",
        a: "Gunakan dialog yang sederhana dan natural",
        b: "Berusaha untuk konsisten",
        c: "Sediakan umpan balik yang informatif",
        d: "Jawaban benar semua",
        correct: "d",
    },
    {
        question: "Tingkatan bahasa komputer Sintaksis ekuivalen dalam bahasa manusia yaitu:",
        a: "Bunyi dan ejaan suatu kata",
        b: "Grammar atau tata bahasa suatu kalimat",
        c: "Arti partisipan dalam berbicara",
        d: "Jawaban semua benar",
        correct: "b",
    },
    {
        question: "Pada bahasa manusia, ekuivalen dengan bunyi dan ejaan suatu kata adalah pada tingkatan:",
        a: "Sintaksis",
        b: "Leksikal",
        c: "Semantik",
        d: "Morfologi",
        correct: "b",
    },
    {
        question: "Yang termasuk jenis-jenis Dialog yaitu:",
        a: "Speech dan Natural Language",
        b: "PDA dan Pen",
        c: "Direct Manipulation",
        d: "Jawaban benar semua",
        correct: "d",
    },
    {
        question: "Jenis Notasi Dialog yaitu:",
        a: "Tekstual, diagramatik",
        b: "Command Language",
        c: "Leksikal, Sintaksis, Semantik",
        d: "Jawaban benar semua",
        correct: "a",
    },
    {
        question: "Jenis dialog yang fokus pada Menus, Buttons, Forms, Icons adalah:",
        a: "Speech dan Natural Language",
        b: "PDA dan Pen",
        c: "Direct Manipulation",
        d: "WIMP",
        correct: "d",
    },
    {
        question: "Pada ragam dialog, pengguna memberikan tanggapan atas prompt yang diberikan oleh komputer untuk memasukkan perintah atau parameter perintah disebut:",
        a: "Inisiatif",
        b: "Keluwesan",
        c: "Kompleksitas",
        d: "Umpan Balik",
        correct: "a",
    },
    {
        question: "Pada ragam dialog, pengguna mempunyai kesempatan melakukan customizing dan memperluas antarmuka dari sebuah sistem untuk memenuhi kebutuhan disebut:",
        a: "Inisiatif",
        b: "Keluwesan",
        c: "Kompleksitas",
        d: "Umpan Balik",
        correct: "b",
    },
    {
        question: "Pada ragam dialog, jika pengguna melakukan kesalahan komputasi, maka program akan menampilkan suatu pesan kesalahan disebut:",
        a: "Inisiatif",
        b: "Keluwesan",
        c: "Kompleksitas",
        d: "Umpan Balik",
        correct: "d",
    },
    {
        question: "Beberapa perintah seperti DIR, COPY, FORMAT, PASSWD, WHO, VI, LS merupakan terdapat pada kategori ragam dialog:",
        a: "Programming Language Dialogue",
        b: "Form Filling Dialogue",
        c: "Natural Language Interface",
        d: "Command line Dialogue",
        correct: "d",
    },
    {
        question: "Kondisi yang jelas dalam memberikan petunjuk untuk manipulasi suatu objek pada prinsip desain interface disebut:",
        a: "Implied actions",
        b: "Aesthetic Integrity",
        c: "Explicit actions",
        d: "Consistency",
        correct: "c",
    },
    {
        question: "Tidak ada perbedaan antara yang dilihat di layar dengan hasil outputnya pada prinsip desain interface disebut:",
        a: "Direct Manipulation",
        b: "Explicit actions",
        c: "WYSIWYG",
        d: "Aesthetic Integrity",
        correct: "c",
    },
    {
        question: "Ragam dialog yang paling konvensional, perintah – perintah yang dioperasikan tergantung dari sistem komputer yang dipakai dan berada dalam domain command language disebut:",
        a: "Programming Language Dialogue",
        b: "Form Filling Dialogue",
        c: "Natural Language Interface",
        d: "Command line Dialogue",
        correct: "d",
    },
    {
        question: "Bahasa pemrograman dibawah ini yang masih berbentuk teks hasil outputnya adalah:",
        a: "C++",
        b: "Visual Basic",
        c: "Visual Foxpro",
        d: "Macro Media Flash",
        correct: "a",
    },
    {
        question: "Sistem komputer terdiri dari tiga aspek, yaitu:",
        a: "Hardware, Software, Aplikasi",
        b: "Brainware, Hardware, Software",
        c: "Hardware, Brainware, Aplikasi",
        d: "Aplikasi, Software, Brainware",
        correct: "b",
    },
    {
        question: "Perbedaan antara desain UX dan UI adalah:",
        a: "UX berkaitan dengan kualitas interaksi yang dimiliki pengguna akhir dengan produk",
        b: "UI fokus pada manajemen dan analisis proyek",
        c: "UX berkaitan dengan tujuan dan fungsionalitas produk",
        d: "UI berkaitan dengan tujuan dan fungsionalitas produk",
        correct: "c",
    },
    {
        question: "Kepanjangan dari GUI adalah:",
        a: "Graphic User Interface",
        b: "Jawaban SALAH SEMUA",
        c: "Graphical User Interface",
        d: "Graphical User Interfacing",
        correct: "c",
    },
    {
        question: "Penentu keberhasilan Sistem yaitu:",
        a: "Berguna (USEFUL)",
        b: "Dapat Digunakan (USABLE)",
        c: "Digunakan (USED)",
        d: "Jawaban BENAR SEMUA",
        correct: "d",
    },
    {
        question: "Fokus pada hierarki dan pola visual yang memberikan isyarat visual kepada pengguna mengenai skema warna, tata letak dan lain-lain adalah:",
        a: "Visibility",
        b: "User Interface",
        c: "User Experience",
        d: "Robustness",
        correct: "b",
    },
    {
        question: "Derajat kemampuan sebuah perangkat lunak untuk membantu penggunanya dalam menyelesaikan sebuah tugas disebut:",
        a: "Usability",
        b: "Learnability",
        c: "Media komunikasi",
        d: "Visualization",
        correct: "a",
    },
    {
        question: "Yang termasuk ke dalam user interface adalah",
        a: "Jawaban SALAH SEMUA",
        b: "UI",
        c: "GUI",
        d: "Jawaban BENAR SEMUA",
        correct: "d",
    },
    {
        question: "Menunjuk kepada kemampuan mudah diingat lagi alurnya setelah tidak digunakan lagi dalam jangka waktu tertentu, merupakan komponen penentu daya guna:",
        a: "Jawaban BENAR SEMUA",
        b: "Awarness Periferal",
        c: "Learnability",
        d: "Memorability",
        correct: "d",
    },
    {
        question: "Perancang yang bertanggung jawab untuk merancang pengalaman yang dimiliki pengguna saat berinteraksi dengan sebuah produk adalah",
        a: "UI User Experiencing",
        b: "UX User Experience",
        c: "UI User Interface",
        d: "UI User Interfacing",
        correct: "b",
    },
    {
        question: "Sistem yang memiliki daya guna yang tinggi dapat:",
        a: "Meningkatkan kepuasan pengguna",
        b: "Mengurangi biaya pelatihan",
        c: "Support Consume",
        d: "Jawaban BENAR SEMUA",
        correct: "d",
    },
    {
        question: "Prinsip USABILITY menurut ISO 9241 adalah",
        a: "Jawaban Benar semua",
        b: "Learnability, Flexibility, Robustness",
        c: "Jawaban Salah semua",
        d: "Learnability, Efisiensi, Kepuasan",
        correct: "b",
    },
    {
        question: "Menurut ALAN DIX prinsip Usability dimana kemudahan pengguna baru dapat menggunakan interaksi secara efektif dan memperoleh maximal kerja adalah",
        a: "Visibility",
        b: "Learnability",
        c: "Robustness",
        d: "Efficiency",
        correct: "b",
    },
    {
        question: "Untuk mengarahkan pandangan pembaca pada suatu yang ditonjolkan merupakan tujuan utama dari",
        a: "Keselarasan (Harmoni)",
        b: "Penekanan (Emphasis)",
        c: "Keseimbangan (Balance)",
        d: "Kesebandingan (Proporsi)",
        correct: "b",
    },
    {
        question: "Menurut Nielsen (1993) Usability terbagi menjadi beberapa dimensi yaitu",
        a: "Learnability, Efficiency, Memorability, Error, Visibility",
        b: "Learnability, Efficiency, Memorability, Error, Satisfaction",
        c: "Learnability, Efficiency, Memorability, Error, Robustness",
        d: "Learnability, Efficiency, Memorability, Error, Flexibility",
        correct: "b",
    },
    {
        question: "Prinsip Usability dimana dukungan untuk user agar dapat mencapai tujuan yang baik adalah",
        a: "Efficiency",
        b: "Learnability",
        c: "Utility-based",
        d: "Robustness",
        correct: "d",
    },
    {
        question: "Aplikasi dari nama atau deskripsi istilah objek lain yang tidak dapat diartikan secara harafiah adalah Prinsip Desain Grafik",
        a: "Consistency (Ketetapan)",
        b: "Alignment (Perataan)",
        c: "Clarity",
        d: "Metaphor",
        correct: "d",
    },
    {
        question: "Agent dapat melakukan tugas secara mandiri dan tidak dipengaruhi secara langsung oleh user, agent lain ataupun oleh lingkungan (environment) adalah karakteristik agent",
        a: "Awarness Periferal",
        b: "Speech",
        c: "Intelligence, Reasoning, dan Learning",
        d: "Non Speech",
        correct: "b",
    },
    {
        question: "Tujuan-tujuan dalam Agent adalah",
        a: "Utility-based",
        b: "Awarness Periferal",
        c: "Goal-based",
        d: "Learning",
        correct: "c",
    },
    {
        question: "Dibawah ini Karakteristik Agent kecuali",
        a: "Delegation",
        b: "Autonomy",
        c: "Intelligence, Reasoning, dan Learning",
        d: "Awarness Periferal ",
        correct: "d",
    },
    {
        question: "User harus mendengarkan keseluruhan kalimat sebelum mengerti maksudnya, sehingga membutuhkan waktu yang panjang adalah pengertian dari AUDIO",
        a: "Non Speech",
        b: "Speech",
        c: "Awarness Periferal",
        d: "Intelligence, Reasoning, dan Learning",
        correct: "b",
    },
    {
        question: "Segala sesuatu yang dapat melihat, mengartikan, mengetahui (perceiving) linkungannya melalui alat sensor (sensors) dan bertindak (acting) melalui alat aktuator(actuators) adalah pengertian dari",
        a: "SONIFIKASI",
        b: "Jawaban BENAR SEMUA",
        c: "Peringatan",
        d: "AGENT",
        correct: "d",
    },
    {
        question: "Audio yang sifatnya Universal adalah",
        a: "Audio Non Speech",
        b: "Learning",
        c: "Audio Speech",
        d: "Utility-based",
        correct: "a",
    },
    {
        question: "Dibawah ini adalah Tipe-Tipe Agent kecuali",
        a: "Learning",
        b: "Utility-based",
        c: "Goal-based",
        d: "Awarness Periferal",
        correct: "d",
    },
    {
        question: "Audio terbagi dari:",
        a: "Jawaban BENAR SEMUA",
        b: "Media komunikasi",
        c: "Speech dan Non Speech",
        d: "Media INFORMASI",
        correct: "c",
    },
    {
        question: "Audio sering disebut sebagai",
        a: "Visualisasi",
        b: "Jawaban BENAR SEMUA",
        c: "Media INFORMASI",
        d: "Media komunikasi",
        correct: "d",
    },
    {
        question: "Audio Non Speech digunakan sebagai",
        a: "Peringatan",
        b: "Awarness Periferal",
        c: "Sonifikasi",
        d: "Jawaban BENAR SEMUA",
        correct: "d",
    }
];

let quizData = [...quizDataOriginal];

// Initialize userAnswers after quizData
userAnswers = Array(quizData.length).fill(null);

loadQuiz();

function loadQuiz() {
    deselectAnswers();

    const currentQuizData = quizData[currentQuiz];

    questionNumberEl.innerText = `Question ${currentQuiz + 1}`;
    questionEl.innerText = currentQuizData.question;
    a_text.innerText = `a. ${currentQuizData.a}`;
    b_text.innerText = `b. ${currentQuizData.b}`;
    c_text.innerText = `c. ${currentQuizData.c}`;
    d_text.innerText = `d. ${currentQuizData.d}`;

    // Show the "Previous" button if it's not the first question
    prevBtn.style.display = currentQuiz > 0 ? 'inline-block' : 'none';

    // Show the "Shuffle" button only on the first question
    shuffleBtn.style.display = currentQuiz === 0 ? 'inline-block' : 'none';

    // Preselect the user's previous answer if available
    if (userAnswers[currentQuiz]) {
        document.getElementById(userAnswers[currentQuiz]).checked = true;
    }
}

function deselectAnswers() {
    const answers = document.querySelectorAll('.answer');
    answers.forEach(answer => answer.checked = false);
}

function getSelected() {
    const answers = document.querySelectorAll('.answer');
    let answer;
    answers.forEach(answerEl => {
        if (answerEl.checked) {
            answer = answerEl.id;
        }
    });
    return answer;
}

function shuffleQuiz() {
    quizData = quizDataOriginal.sort(() => Math.random() - 0.5);
    currentQuiz = 0;
    userAnswers = Array(quizData.length).fill(null);
    score = 0;
    errors = [];
    loadQuiz();
}

function updateScore() {
    score = 0;
    errors = [];
    quizData.forEach((question, index) => {
        const userAnswer = userAnswers[index];
        if (userAnswer) {
            if (userAnswer === question.correct) {
                score++;
            } else {
                errors.push({
                    questionNumber: index,
                    userAnswer: userAnswer
                });
            }
        }
    });
}

function showErrors() {
    errorsDiv.innerHTML = '<h3>Soal yang dijawab salah:</h3>';
    errors.forEach((error, index) => {
        const questionData = quizData[error.questionNumber];
        const userAnswerKey = error.userAnswer; // Huruf pilihan user
        const userAnswerText = userAnswerKey ? questionData[userAnswerKey] : 'Tidak dijawab';
        const correctAnswerKey = questionData.correct; // Huruf pilihan benar
        const correctAnswerText = questionData[correctAnswerKey];

        errorsDiv.innerHTML += `
            <div style="border: 1px solid #ccc; margin: 10px 0; padding: 10px; border-radius: 5px; background-color: #f9f9f9;">
                <h4>Soal ${error.questionNumber + 1}: ${questionData.question}</h4>
                <ul style="list-style: none; padding: 0;">
                    <li style="${userAnswerKey === 'a' ? 'color: red;' : ''}">a. ${questionData.a}</li>
                    <li style="${userAnswerKey === 'b' ? 'color: red;' : ''}">b. ${questionData.b}</li>
                    <li style="${userAnswerKey === 'c' ? 'color: red;' : ''}">c. ${questionData.c}</li>
                    <li style="${userAnswerKey === 'd' ? 'color: red;' : ''}">d. ${questionData.d}</li>
                </ul>
                <p style="margin: 5px 0; color: red;">
                    Jawaban Anda: ${userAnswerKey ? `${userAnswerKey}. ${userAnswerText}` : 'Tidak dijawab'}
                </p>
                <p style="margin: 5px 0; color: green;">
                    Jawaban yang benar: ${correctAnswerKey}. ${correctAnswerText}
                </p>
            </div>
        `;
    });
    errorsDiv.style.display = 'block';
}

function showCorrectAnswers() {
    correctAnswersDiv.innerHTML = '<h3>Jawaban yang benar:</h3>';
    quizData.forEach((question, index) => {
        if (!errors.some(error => error.questionNumber === index)) {
            correctAnswersDiv.innerHTML += `<p>${index + 1}. ${question.question} - Jawaban benar: ${question[question.correct]}</p>`;
        }
    });
    correctAnswersDiv.style.display = 'block';
}

submitBtn.addEventListener('click', () => {
    if (quizCompleted) return;

    const answer = getSelected();

    if (answer) {
        userAnswers[currentQuiz] = answer;

        updateScore();

        currentQuiz++;

        if (currentQuiz < quizData.length) {
            loadQuiz();
        } else {
            quizCompleted = true;
            quiz.innerHTML = `
                <h2>You answered ${score}/${quizData.length} questions correctly</h2>
                <button onclick="location.reload()">Reload</button>
            `;
            resultDiv.style.display = 'block';
            scoreEl.innerText = `You answered ${score}/${quizData.length} questions correctly`;
            showErrors();
            showCorrectAnswers();
        }
    }
});

prevBtn.addEventListener('click', () => {
    if (currentQuiz > 0 && !quizCompleted) {
        currentQuiz--;
        loadQuiz();
    }
});

shuffleBtn.addEventListener('click', shuffleQuiz);
