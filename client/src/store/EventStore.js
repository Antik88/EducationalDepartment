import { makeAutoObservable } from "mobx"

export default class EventStore {
    constructor() {
        this._name = ''
        this._eventGoal = ''
        this._dischipl = ''
        this._additional = ''
        this._dateLine = ''
        this._selectedInvites = ''
        this._organize = ''
        this._invites = []
        this._subdivisions = []
        this._faultis = []
        this._categories = []
        makeAutoObservable(this)
    }

    setFacultis(facultis) {
        this._faultis = facultis
    }

    setSubdivisions(subdivision) {
        this._subdivisions = subdivision
    }

    setIvints(invites) {
        this._invites = invites
    }

    setName(name) {
        this._name = name
    }
    setEventGoal(goal) {
        this._eventGoal = goal
    }
    setDischipl(dischpl) {
        this._dateLine = dischpl
    }
    setAdditional(additional) {
        this._additional = additional
    }
    setSelectedInvites(invites) {
        this._selectedInvites = invites
    }
    setOrganize(organize) {
        this._organize = organize
    }

    setCategories(categories){
        this._categories = categories
    }

    get categories() {
        return this._categories
    }

    get facultis() {
        return this._faultis
    }
    get subdivisions() {
        return this._subdivisions
    }

    get invites() {
        return this._invites
    }

    get name() {
        return this._name
    }

    get eventGoal() {
        return this._eventGoal
    }

    get dischpl() {
        return this._dischipl
    }

    get additional() {
        return this._additional
    }

    get selected_invites() {
        return this._selectedInvites
    }

    get organize() {
        return this._organize
    }
}