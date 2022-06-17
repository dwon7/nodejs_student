const XLSX = require("xlsx"); 
const Student = require("../models/student.model");
const outputPath = 'storage/outputs'; 

exports.index = async (req, res) => { 
    const students = await Student.findAll();
    return res.render('index', { students });
}

exports.import = async (req, res) => { 
    const wb = XLSX.readFile(req.file.path); 
    const sheets = wb.SheetNames;
    
    if(sheets.length > 0) {
        const data = XLSX.utils.sheet_to_json(wb.Sheets[sheets[0]]);
        const students = data.map(row => ({
            school: row['Trường Tiểu học'],
            dictrict: row['Quận/Huyện'],
            studentId: row['Mã học sinh'],
            classroom: row['Lớp'],
            fullname: row['Họ và tên'],
            day: row['Ngày'],
            month: row['Tháng'],
            year: row['Năm'],
            gender: row['Giới'],
            placeOfBirth: row['Nơi sinh'],
            ethnic: row['Dân tộc'],
            placeOfLiving: row['Hộ khẩu thường trú'],
            phoneNum: row['Điện thoại liên hệ'],
            grade1: row['Tổng điểm năm lớp 1'],
            grade2: row['Tổng điểm năm lớp 2'],
            grade3: row['Tổng điểm năm lớp 3'],
            grade4: row['Tổng điểm năm lớp 4'],
            grade5: row['Tổng điểm năm lớp 5'],
            all5GradePoint: row['Tổng điểm kết quả 5 năm'],
            bonusPoint: row['Điểm ưu tiên'],
            totalPoint: row['Tổng điểm sơ tuyển'],
            note: row['Ghi chú']
        }))
        await Student.bulkCreate(students); 
    }
    return res.redirect('/');
}

exports.export = async (req, res) => {
    const students = await Student.findAll({
        attributes: [
            'id', 
            'school', 
            'dictrict', 
            'studentId', 
            'classroom',
            'fullname', 
            'day', 
            'month', 
            'year', 
            'gender',
            'placeOfBirth', 
            'ethnic', 
            'placeOfLiving', 
            'phoneNum', 
            'grade1',
            'grade2', 
            'grade3', 
            'grade4', 
            'grade5', 
            'all5GradePoint',
            'bonusPoint', 
            'totalPoint', 
            'note'            
        ],
        raw: true
    }); 

    const headings = [
            [
                'STT',
                'Trường Tiểu học',
                'Quận/Huyện',
                'Mã học sinh',
                'Lớp',
                'Họ và tên',
                'Ngày',
                'Tháng',
                'Năm',
                'Giới',
                'Nơi sinh',
                'Dân tộc',
                'Hộ khẩu thường trú',
                'Điện thoại liên hệ',
                'Tổng điểm năm lớp 1',
                'Tổng điểm năm lớp 2',
                'Tổng điểm năm lớp 3',
                'Tổng điểm năm lớp 4',
                'Tổng điểm năm lớp 5',
                'Tổng điểm kết quả 5 năm',
                'Điểm ưu tiên',
                'Tổng điểm sơ tuyển',
                'Ghi chú'
        ]
    ]; 

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(students, { 
        origin: 'A2', 
        skipHeader: true 
    });
    XLSX.utils.sheet_add_aoa(ws, headings); 
    XLSX.utils.book_append_sheet(wb, ws, 'Students');

    const buffer = XLSX.write(wb, { bookType: 'csv', type: 'buffer' }); 
    res.attachment('students.csv');

    return res.send(buffer);
}