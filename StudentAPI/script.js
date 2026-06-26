const API = "http://localhost:8081/api/students";
document.addEventListener("DOMContentLoaded", fetchStudents);
async function fetchStudents() {
    try {
        const response = await fetch(`${API}?page=0&size=50`);
        const pageData = await response.json();
        const students = pageData.content || [];
        const tbody = document.getElementById("studentTableBody");
        tbody.innerHTML = "";
        if (students.length === 0) {
            tbody.innerHTML = `<tr><td colspan="7">Bảng dữ liệu trống</td></tr>`;
            return;
        }
        students.forEach(st => {
            const math = st.mathScore ?? 0;
            const lit = st.literatureScore ?? 0;
            const engl = st.englishScore ?? 0;
            tbody.innerHTML += `
                <tr>
                    <td><b>${st.id}</b></td>
                    <td>${st.name || 'N/A'}</td>
                    <td>${st.classId || 'N/A'}</td>
                    <td>${math}</td>
                    <td>${lit}</td>
                    <td>${engl}</td>
                    <td>
                        <button type="button" onclick="editStudent('${st.id}', '${st.name}', '${st.classId}', ${math}, ${lit}, ${engl})">Sửa</button>
                        <button type="button" onclick="deleteStudent('${st.id}')">Xóa</button>
                    </td>
                </tr>
            `;
        });
    } catch (error) {
        console.error("Lỗi GET:", error);
        alert("Không thể kết nối đến API!");
    }
}
document.getElementById("studentForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const mode = document.getElementById("formMode").value;
    const id = document.getElementById("stuId").value;
    const name = document.getElementById("stuName").value;
    const classId = document.getElementById("stuClassId").value;
    const age  = parseInt(document.getElementById("stuAge").value);
    const gender = document.getElementById("stuGender").value;
    const address = document.getElementById("stuAddress").value;
    if (mode === "ADD") {
        const studentDTO = {id, name, classId, age, gender, address};
        try {
            const response = await fetch(API, {
                method: "POST",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify(studentDTO)
            });
            if (response.ok) {
                alert("Thêm học sinh mới thành công!");
                resetToAddMode();
                fetchStudents();
            } else {
                alert("Thêm thất bại: " + await response.text());
            }
        } catch(error) {
            console.error("Lỗi POST:", error);
        }
    } else if (mode == "EDIT") {
        const m = document.getElementById("scoreM").value;
        const l = document.getElementById("scoreV").value;
        const engl = document.getElementById("scoreA").value;
        const url = `${API}/${id}/score?m=${m}&l=${l}&e=${engl}`;
        try {
            const response = await fetch(url, {method: "PUT"});
            if (response.ok) {
                alert("Cập nhật thành công!");
                resetToAddMode();
                fetchStudents();
            } else {
                alert("Cập nhật thất bại: " + await response.text());
            }
        } catch (error) {
            console.error("Lỗi PUT:", error);
        }
    }
});
function editStudent(id, name, classId, math, lit, engl) {
    document.getElementById("formMode").value = "EDIT";
    document.getElementById("formHeader").innerText = "Chỉnh thông tin học sinh";
    document.getElementById("stuId").value = id;
    document.getElementById("stuId").readOnly = true;
    document.getElementById("stuName").value = name;
    document.getElementById("stuName").readOnly = true;
    document.getElementById("stuClassId").value = classId;
    document.getElementById("stuClassId").readOnly = true;
    document.getElementById("scoreM").value = math;
    document.getElementById("scoreM").value = math;
    document.getElementById("scoreV").value = lit;
    document.getElementById("scoreA").value = engl;
    document.getElementById("btnCancel").classList.remove("hidden");
}
function resetToAddMode() {
    document.getElementById("studentForm").reset();
    document.getElementById("formMode").value = "ADD";
    document.getElementById("formHeader").innerText = "Thêm học sinh mới";
    document.getElementById("stuId").readOnly = false;
    document.getElementById("stuName").readOnly = false;
    document.getElementById("stuClassId").readOnly = false;
    document.getElementById("stuAge").readOnly = false;
    document.getElementById("stuGender").disabled = false;
    document.getElementById("stuAddress").readOnly = false;
    document.getElementById("btnCancel").classList.add("hidden");
}
async function deleteStudent(id) {
    if (!confirm(`Bạn có chắc chắn xóa ID: ${id} không?`)) return;
    try {
        const response = await fetch(`${API}/${id}`, {method: "DELETE"});
        if (response.ok) {
            alert("Xóa thành công!");
            if (document.getElementById("stuId").value === id) {
                resetToAddMode();
            }
            fetchStudents();
        } else {
            alert("Thất bại: " + await response.text());
        }
    } catch (error) {
        console.error("Lỗi DELETE:", error);
    }
}