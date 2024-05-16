
import SystemConstant from "../constant/SystemConstant";
class ExportFileExcelService {

    exportStudent(nameFile, subjectGroupId) {
        const a = document.createElement("a");
        a.href = SystemConstant.BASE_REST_API_URL + `/export/students?fileName=${nameFile}&subjectGroupId=${subjectGroupId}`;
        const clickEvnt = new MouseEvent("click", {
            view: window,
            bubbles: true,
            cancelable: true,
        });
        a.dispatchEvent(clickEvnt);
        a.remove();
    }


}

export default new ExportFileExcelService();