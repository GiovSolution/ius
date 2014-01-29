Ext.define('YMPI.controller.PRODUK',{
	extend: 'Ext.app.Controller',
	views: ['MASTER.v_produk','MASTER.v_produk_form'],
	models: ['m_produk'],
	stores: ['s_produk', 's_satuan'],
	
	requires: ['Ext.ModelManager'],
	
	refs: [{
		ref: 'Listproduk',
		selector: 'Listproduk'
	}, {
		ref: 'v_produk_form',
		selector: 'v_produk_form'
	}, {
		ref: 'SaveBtnForm',
		selector: 'v_produk_form #save'
	}, {
		ref: 'CreateBtnForm',
		selector: 'v_produk_form #create'
	}, {
		ref: 'PRODUK',
		selector: 'PRODUK'
	}],


	init: function(){
		this.control({
			'PRODUK': {
				'afterrender': this.produkAfterRender
			},
			'Listproduk': {
				'selectionchange': this.enableDelete,
				'itemdblclick': this.updateListproduk
			},
			'Listproduk button[action=create]': {
				click: this.createRecord
			},
			'Listproduk button[action=delete]': {
				click: this.deleteRecord
			},
			'Listproduk button[action=xexcel]': {
				click: this.export2Excel
			},
			'Listproduk button[action=xpdf]': {
				click: this.export2PDF
			},
			'Listproduk button[action=print]': {
				click: this.printRecords
			},
			'v_produk_form button[action=save]': {
				click: this.saveV_produk_form
			},
			'v_produk_form button[action=create]': {
				click: this.saveV_produk_form
			},
			'v_produk_form button[action=cancel]': {
				click: this.cancelV_produk_form
			}
		});
	},
	
	produkAfterRender: function(){
		var produkStore = this.getListproduk().getStore();
		produkStore.load();
	},
	
	createRecord: function(){
		var getListproduk	= this.getListproduk();
		var getV_produk_form= this.getV_produk_form(),
			form			= getV_produk_form.getForm();
		var getSaveBtnForm	= this.getSaveBtnForm();
		var getCreateBtnForm	= this.getCreateBtnForm();
		
		/* grid-panel */
		getListproduk.setDisabled(true);
        
		/* form-panel */
		form.reset();
		getV_produk_form.down('#produk_id_field').setReadOnly(false);
		getSaveBtnForm.setDisabled(true);
		getCreateBtnForm.setDisabled(false);
		getV_produk_form.setDisabled(false);
		
		this.getPRODUK().setActiveTab(getV_produk_form);		
	},
	
	enableDelete: function(dataview, selections){
		this.getListproduk().down('#btndelete').setDisabled(!selections.length);
	},
	
	updateListproduk: function(me, record, item, index, e){
		var getPRODUK		= this.getPRODUK();
		var getListproduk	= this.getListproduk();
		var getV_produk_form= this.getV_produk_form(),
			form			= getV_produk_form.getForm();
		var getSaveBtnForm	= this.getSaveBtnForm();
		var getCreateBtnForm	= this.getCreateBtnForm();
		var satuanStore		= this.getStore('s_satuan');
		
		getSaveBtnForm.setDisabled(false);
		getCreateBtnForm.setDisabled(true);
		getV_produk_form.down('#produk_id_field').setReadOnly(true);		
		getV_produk_form.loadRecord(record);
		
		satuanStore.getProxy().extraParams.query = record.data.produk_satuan;
		satuanStore.load({
			scope: this,
			callback: function(recordsCabang, operation, success) {
				if (success) {
					var task = new Ext.util.DelayedTask(function(){
						getV_produk_form.loadRecord(record);
					});
					task.delay(10);
				}
			}
		});


		getListproduk.setDisabled(true);
		getV_produk_form.setDisabled(false);
		getPRODUK.setActiveTab(getV_produk_form);
	},
	
	deleteRecord: function(dataview, selections){
		var getstore = this.getListproduk().getStore();
		var selection = this.getListproduk().getSelectionModel().getSelection()[0];
		if(selection){
			Ext.Msg.confirm('Confirmation', 'Are you sure to delete this data: "produk_id" = "'+selection.data.produk_id+'"?', function(btn){
				if (btn == 'yes'){
					getstore.remove(selection);
					getstore.sync();
				}
			});
			
		}
	},
	
	export2Excel: function(){
		var getstore = this.getListproduk().getStore();
		var jsonData = Ext.encode(Ext.pluck(getstore.data.items, 'data'));
		
		Ext.Ajax.request({
			method: 'POST',
			url: 'c_produk/export2Excel',
			params: {data: jsonData},
			success: function(response){
				window.location = ('./temp/'+response.responseText);
			}
		});
	},
	
	export2PDF: function(){
		var getstore = this.getListproduk().getStore();
		var jsonData = Ext.encode(Ext.pluck(getstore.data.items, 'data'));
		
		Ext.Ajax.request({
			method: 'POST',
			url: 'c_produk/export2PDF',
			params: {data: jsonData},
			success: function(response){
				window.open('./temp/produk.pdf', '_blank');
			}
		});
	},
	
	printRecords: function(){
		var getstore = this.getListproduk().getStore();
		var jsonData = Ext.encode(Ext.pluck(getstore.data.items, 'data'));
		
		Ext.Ajax.request({
			method: 'POST',
			url: 'c_produk/printRecords',
			params: {data: jsonData},
			success: function(response){
				var result=eval(response.responseText);
				switch(result){
				case 1:
					win = window.open('./temp/produk.html','produk_list','height=400,width=900,resizable=1,scrollbars=1, menubar=1');
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
	
	saveV_produk_form: function(){
		var getPRODUK		= this.getPRODUK();
		var getListproduk 	= this.getListproduk();
		var getV_produk_form= this.getV_produk_form(),
			form			= getV_produk_form.getForm(),
			values			= getV_produk_form.getValues();
		var store 			= this.getStore('s_produk');
		
		if (form.isValid()) {
			var jsonData = Ext.encode(values);
			
			Ext.Ajax.request({
				method: 'POST',
				url: 'c_produk/save',
				params: {data: jsonData},
				success: function(response){
					store.reload({
						callback: function(){
							var newRecordIndex = store.findBy(
								function(record, id) {
									if (record.get('produk_id') === values.produk_id) {
										return true;
									}
									return false;
								}
							);
							/* getListproduk.getView().select(recordIndex); */
							getListproduk.getSelectionModel().select(newRecordIndex);
						}
					});
					
					getV_produk_form.setDisabled(true);
					getListproduk.setDisabled(false);
					getPRODUK.setActiveTab(getListproduk);
				}
			});
		}
	},
	
	createV_produk_form: function(){
		var getPRODUK		= this.getPRODUK();
		var getListproduk 	= this.getListproduk();
		var getV_produk_form= this.getV_produk_form(),
			form			= getV_produk_form.getForm(),
			values			= getV_produk_form.getValues();
		var store 			= this.getStore('s_produk');
		
		if (form.isValid()) {
			var jsonData = Ext.encode(values);
			
			Ext.Ajax.request({
				method: 'POST',
				url: 'c_produk/save',
				params: {data: jsonData},
				success: function(response){
					store.reload();
					
					getV_produk_form.setDisabled(true);
					getListproduk.setDisabled(false);
					getPRODUK.setActiveTab(getListproduk);
				}
			});
		}
	},
	
	cancelV_produk_form: function(){
		var getPRODUK		= this.getPRODUK();
		var getListproduk	= this.getListproduk();
		var getV_produk_form= this.getV_produk_form(),
			form			= getV_produk_form.getForm();
			
		form.reset();
		getV_produk_form.setDisabled(true);
		getListproduk.setDisabled(false);
		getPRODUK.setActiveTab(getListproduk);
	}
	
});