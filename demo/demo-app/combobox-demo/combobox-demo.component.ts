import { Component, OnInit, ViewEncapsulation } from "@angular/core";

@Component({
	selector: "app-combobox-demo",
	template: `
		<h1>Combo box demo</h1>

		<h2>Single-select</h2>
		<div style="width: 330px;">
			<n-combo-box
				placeholder="Select or enter"
				[items]="demoItems2"
				(selected)="onSelect($event)">
				<n-dropdown-list></n-dropdown-list>
			</n-combo-box>
		</div>

		<h2>Multi-select</h2>
		<div style="width: 330px;">
			<n-combo-box
				placeholder="Select or enter"
				type="multi"
				[items]="demoItems3"
				(selected)="onSelect($event)"
				(submit)="onSubmit($event)">
				<n-dropdown-list></n-dropdown-list>
			</n-combo-box>
		</div>

		<h2>Disabled</h2>
		<div style="width: 330px;">
			<n-combo-box
				disabled="true"
				placeholder="Select or enter">
				<n-dropdown-list></n-dropdown-list>
			</n-combo-box>
		</div>

		<h2>Internal components</h2>
		<h3>Pill input</h3>
		<div style="display:flex;">
			<n-pill-input
				[pills]="visibleItems1"
				(updatePills)="filterPills()"
				(submit)="demoSubmit($event)"
				type="multi">
			</n-pill-input>
			<button
				class="btn--primary"
				(click)="resetPills()"
				style="margin-left: 10px;">
				Reset
			</button>
		</div>
		<h3>Drop-down list</h3>
		<div style="position: relative; z-index: 1;">
			<div class="dropdown-wrapper">
				<div class="dropdown-menu open" style="position: relative;">
					<n-dropdown-list [items]="demoItems4"></n-dropdown-list>
				</div>
			</div>
		</div>
		<h3>Drop-down multi list</h3>
		<div style="position: relative; z-index: 1;">
			<div class="dropdown-wrapper">
				<div class="dropdown-menu open" style="position: relative;">
					<n-dropdown-list [items]="demoItems4" type="multi"></n-dropdown-list>
				</div>
			</div>
		</div>
	`,
	encapsulation: ViewEncapsulation.None
})
export class ComboboxDemo implements OnInit {
	demoItems1 = [
		{
			content: "Abacus",
			selected: false
		},
		{
			content: "Byte",
			selected: false,
		},
		{
			content: "Computer",
			selected: false
		},
		{
			content: "Digital",
			selected: false
		}
	];
	demoItems2 = Array.from(this.demoItems1, item => Object.assign({}, item));
	demoItems3 = Array.from(this.demoItems1, item => Object.assign({}, item));
	demoItems4 = Array.from(this.demoItems1, item => Object.assign({}, item));
	visibleItems1 = this.demoItems1.map(item => { item.selected = true; return item; });
	public docs: any = "";

	ngOnInit() {
		this.demoItems1.forEach(item => item.selected = true);
	}

	onSelect(ev) {
		console.log(ev);
	}

	onSubmit(ev) {
		console.log(ev);
		ev.value.selected = true;
		this.demoItems3 = [...ev.items.slice(0, ev.index), ev.value, ...ev.items.slice(ev.index)];
	}

	onClose() {
		console.log("dropdown closed");
	}

	filterPills() {
		console.log(this.visibleItems1, this.demoItems1);
		this.visibleItems1 = this.demoItems1.filter(item => item.selected);
	}

	demoSubmit(ev) {
		console.log(ev);
		let index = this.demoItems1.indexOf(ev.after) + 1;
		this.demoItems1 = [
			...this.demoItems1.slice(0, index),
			{content: ev.value, selected: true},
			...this.demoItems1.slice(index)
		];
		this.visibleItems1 = this.demoItems1.filter(item => item.selected);
	}

	resetPills() {
		this.visibleItems1 = this.demoItems1.map(item => { item.selected = true; return item; });
	}
}
