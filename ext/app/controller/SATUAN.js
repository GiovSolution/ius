Ext.define('YMPI.controller.SATUAN',{
	extend: 'Ext.app.Controller',
	views: ['MASTER.v_satuan','MASTER.v_satuan_form'],
	models: ['m_satuan'],
	stores: ['s_satuan'],
	
	requires: ['Ext.ModelManager'],
	
	refs: [{
		ref: 'Listsatuan',
		selector: 'Listsatuan'
	}, {
		ref: 'v_satuan_form',
		selector: 'v_satuan_form'
	}, {
		ref: 'SaveBtnForm',
		selector: 'v_satuan_form #save'
	}, {
		ref: 'CreateBtnForm',
		selector: 'v_satuan_form #create'
	}, {
		ref: 'SATUAN',
		selector: 'SATUAN'
	}],


	init: function(){
		this.control({
			'SATUAN': {
				'afterrender': this.cabangAfterRender
			},
			'Listsatuan': {
				'selectionchange': this.enableDelete,
				'itemdblclick': this.updateListsatuan
			},
			'Listsatuan button[action=create]': {
				click: this.createRecord
			},
			'Listsatuan button[action=delete]': {
				click: this.deleteRecord
			},
			'Listsatuan button[action=xexcel]': {
				click: this.export2Excel
			},
			'Listsatuan button[action=xpdf]': {
				click: this.export2PDF
			},
			'Listsatuan button[action=print]': {
				click: this.printRecords
			},
			'v_satuan_form button[action=save]': {
				click: this.saveV_satuan_form
			},
			'v_satuan_form button[action=create]': {
				click: this.saveV_satuan_form
			},
			'v_satuan_form button[action=cancel]': {
				click: this.cancelV_satuan_form
			}
		});
	},
	
	cabangAfterRender: function(){
		var satuanStore = this.getListsatuan().getStore();
		satuanStore.load();
	},
	
	createRecord: function(){
		var getListsatuan	= this.getListsatuan();
		var getV_satuan_form= this.getV_satuan_form(),
			form			= getV_satuan_form.getForm();
		var getSaveBtnForm	= this.getSaveBtnForm();
		var getCreateBtnForm	= this.getCreateBtnForm();
		
		/* grid-panel */
		getListsatuan.setDisabled(true);
        
		/* form-panel */
		form.reset();
		getV_satuan_form.down('#satuan_id_field').setReadOnly(false);
		getSaveBtnForm.setDisabled(true);
		getCreateBtnForm.setDisabled(false);
		getV_satuan_form.setDisabled(false);
		
		this.getSATUAN().setActiveTab(getV_satuan_form);		
	},
	
	enableDelete: function(dataview, selections){
		this.getListsatuan().down('#btndelete').setDisabled(!selections.length);
	},
	
	updateListsatuan: function(me, record, item, index, e){
		var getSATUAN		= this.getSATUAN();
		var getListsatuan	= this.getListsatuan();
		var getV_satuan_form= this.getV_satuan_form(),
			form			= getV_satuan_form.getForm();
		var getSaveBtnForm	= this.getSaveBtnForm();
		var getCreateBtnForm	= this.getCreateBtnForm();
		
		getSaveBtnForm.setDisabled(false);
		getCreateBtnForm.setDisabled(true);
		getV_satuan_form.down('#satuan_id_field').setReadOnly(true);		
		getV_satuan_form.loadRecord(record);
		
		getListsatuan.setDisabled(true);
		getV_satuan_form.setDisabled(false);
		getSATUAN.setActiveTab(getV_satuan_form);
	},
	
	deleteRecord: function(dataview, selections){
		var getstore = this.getListsatuan().getStore();
		var selection = this.getListsatuan().getSelectionModel().getSelection()[0];
		if(selection){
			Ext.Msg.confirm('Confirmation', 'Are you sure to delete this data: "satuan_id" = "'+selection.data.satuan_id+'"?', function(btn){
				if (btn == 'yes'){
					getstore.remove(selection);
					getstore.sync();
				}
			});
			
		}
	},
	
	export2Excel: function(){
		var getstore = this.getListsatuan().getStore();
		var jsonData = Ext.encode(Ext.pluck(getstore.data.items, 'data'));
		
		Ext.Ajax.request({
			method: 'POST',
			url: 'c_satuan/export2Excel',
			params: {data: jsonData},
			success: function(response){
				window.location = ('./temp/'+response.responseText);
			}
		});
	},
	
	export2PDF: function(){
		var getstore = this.getListsatuan().getStore();
		var jsonData = Ext.encode(Ext.pluck(getstore.data.items, 'data'));
		
		Ext.Ajax.request({
			method: 'POST',
			url: 'c_satuan/export2PDF',
			params: {data: jsonData},
			success: function(response){
				window.open('./temp/satuan.pdf', '_blank');
			}
		});
	},
	
	printRecords: function(){
		var getstore = this.getListsatuan().getStore();
		var jsonData = Ext.encode(Ext.pluck(getstore.data.items, 'data'));
		
		Ext.Ajax.request({
			method: 'POST',
			url: 'c_satuan/printRecords',
			params: {data: jsonData},
			success: function(response){
				var result=eval(response.responseText);
				switch(result){
				case 1:
					win = window.open('./temp/satuan.html','satuan_list','height=400,width=900,resizable=1,scrollbars=1, menubar=1');
					break;
				default:
					Ext.MessageBox.show({
						title: 'Warning',
						msg: 'Unable to print the grid!',
						buttons: Ext.MessageBox.OK,
						animEl: 'save',
						icon: Ext.MessageBox.WARNING
					});
					break;
				}  
			}
		});
	},
	
	saveV_satuan_form: function(){
		var getSATUAN		= this.getSATUAN();
		var getListsatuan 	= this.getListsatuan();
		var getV_satuan_form= this.getV_satuan_form(),
			form			= getV_satuan_form.getForm(),
			values			= getV_satuan_form.getValues();
		var store 			= this.getStore('s_satuan');
		
		if (form.isValid()) {
			var jsonData = Ext.encode(values);
			
			Ext.Ajax.request({
				method: 'POST',
				url: 'c_satuan/save',
				params: {data: jsonData},
				success: function(response){
					store.reload({
						callback: function(){
							var newRecordIndex = store.findBy(
								function(record, id) {
									if (record.get('satuan_id') === values.satuan_id) {
										return true;
									}
									return false;
								}
							);
							/* getListsatuan.getView().select(recordIndex); */
							getListsatuan.getSelectionModel().select(newRecordIndex);
						}
					});
					
					getV_satuan_form.setDisabled(true);
					getListsatuan.setDisabled(false);
					getSATUAN.setActiveTab(getListsatuan);
				}
			});
		}
	},
	
	createV_satuan_form: function(){
		var getSATUAN		= this.getSATUAN();
		var getListsatuan 	= this.getListsatuan();
		var getV_satuan_form= this.getV_satuan_form(),
			form			= getV_satuan_form.getForm(),
			values			= getV_satuan_form.getValues();
		var store 			= this.getStore('s_satuan');
		
		if (form.isValid()) {
			var jsonData = Ext.encode(values);
			
			Ext.Ajax.request({
				method: 'POST',
				url: 'c_satuan/save',
				params: {data: jsonData},
				success: function(response){
					store.reload();
					
					getV_satuan_form.setDisabled(true);
					getListsatuan.setDisabled(false);
					getSATUAN.setActiveTab(getListsatuan);
				}
			});
		}
	},
	
	cancelV_satuan_form: function(){
		var getSATUAN		= this.getSATUAN();
		var getListsatuan	= this.getListsatuan();
		var getV_satuan_form= this.getV_satuan_form(),
			form			= getV_satuan_form.getForm();
			
		form.reset();
		getV_satuan_form.setDisabled(true);
		getListsatuan.setDisabled(false);
		getSATUAN.setActiveTab(getListsatuan);
	}
	
});