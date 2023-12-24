import { makeAutoObservable } from "mobx"

export default class DataStore {
    constructor() {
        this._selectedEmpoyeers = []
        this._selectedStudets = []
        this._selectedInvites = []
        this._selectedSubdivision = []
        makeAutoObservable(this)
    }
    setSelectedSubdivision(selectedSubdivision){
       this._selectedSubdivision = selectedSubdivision 
    }
    setSelectedEmployeers(employeers){
        this._selectedEmpoyeers = employeers
    }
    setSelectedStudents(students){
        this._selectedStudets = students
    }
    setSelectedInvites(invites){
        this._selectedInvites = invites 
    }

    get selectedSubdivision() {
        return this._selectedSubdivision
    }

    get selectedInvites() {
        return this._selectedInvites
    }
    get selectedEmployers() {
        return this._selectedEmpoyeers
    }
    get selectedStudents() {
        return this._selectedStudets
    }
}
