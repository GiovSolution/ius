Ext.define('YMPI.view.MASTER.v_produk_form', {
	extend	: 'Ext.form.Panel',
	alias	: 'widget.v_produk_form',
	region:'east',
	id: 'east-region-container',
	
	title		: 'Create/Update Produk',
    bodyPadding	: 5,
    autoScroll	: true,
    
    initComponent: function(){
    	/*
		 * Deklarasi variable setiap field
		 */
		 
		var produk_id_field = Ext.create('Ext.form.field.Number', {
			itemId: 'produk_id_field',
			name: 'produk_id', /* column name of table */
			fieldLabel: 'Produk ID',
			hidden : true,
			// allowBlank: false /* jika primary_key */,
			maxLength: 11 /* length of column name */});
		var produk_nama_field = Ext.create('Ext.form.field.Text', {
			name: 'produk_nama', /* column name of table */
			fieldLabel: 'Nama',
			anchor : '75%',
			allowBlank : false,
			maxLength: 250 /* length of column name */
		});
		var produk_kode_field = Ext.create('Ext.form.field.Text', {
			name: 'produk_kode', /* column name of table */
			fieldLabel: 'Kode',
			anchor : '50%',
			maxLength: 250 /* length of column name */
		});
		var produk_harga_field = Ext.create('Ext.form.field.Number', {
			name: 'produk_harga', /* column name of table */
			fieldLabel: 'Harga',
			anchor : '50%',
			maxLength: 250 /* length of column name */
		});
		var produk_keterangan_field = Ext.create('Ext.form.field.TextArea', {
			name: 'produk_keterangan', /* column name of table */
			fieldLabel: 'Keterangan',
			anchor : '75%',
			maxLength: 250 /* length of column name */
		});
		var produk_aktif_field = Ext.create('Ext.form.field.ComboBox', {
			itemId: 'produk_aktif_field',
			name: 'produk_aktif', /* column name of table */
			fieldLabel: 'Produk Aktif',
			anchor : '50%',
			store: Ext.create('Ext.data.Store',{
                    fields: [
                        {type: 'string', name: 'value'},
                        {type: 'string', name: 'name'}
                    ],
                    data : [
                    	 {"value":"Aktif", "name":"Aktif"},
          				 {"value":"Tidak Aktif", "name":"Tidak Aktif"}
                    ]
            }),
            queryMode : 'local',
            triggerAction: 'all',
            // emptyText : 'Aktif',
            displayField: 'name',
			valueField: 'value'
		});

		var produk_satuan_field = Ext.create('Ext.form.field.ComboBox', {
			name: 'produk_satuan', /* column name of table */
			fieldLabel: 'Satuan',
			allowBlank: true,
			store: 's_satuan',
			queryMode: 'remote',
			displayField:'satuan_nama',
			valueField: 'satuan_id',
	        typeAhead: false,
	        loadingText: 'Searching...',
			//pageSize:15,
	        hideTrigger: false,
	        tpl: Ext.create('Ext.XTemplate',
                '<tpl for=".">',
                    '<div class="x-boundlist-item">[<b>{satuan_id}</b>] - {satuan_nama}</div>',
                '</tpl>'
            ),
            // template for the content inside text field
            displayTpl: Ext.create('Ext.XTemplate',
                '<tpl for=".">',
                	'[{satuan_id}] - {satuan_nama}',
                '</tpl>'
            ),
	        itemSelector: 'div.search-item',
			triggerAction: 'all',
			lazyRender:true,
			listClass: 'x-combo-list-small',
			anchor:'50%',
			forceSelection:true,
			listeners: {
				beforequery: function(queryEvent, e){
					this.getStore().clearFilter();
				},
				select: function(combo, records, e){
					produk_keterangan_field.focus(false, true);
				},
				specialkey: function(field, e){
					if (e.getKey() == e.ENTER) {
						var task = new Ext.util.DelayedTask(function(){
							if (! field.findRecordByValue(field.getValue())) {
								Ext.Msg.show({
									title:'Error',
									msg: 'Isi Satuan salah, karena tidak melalui pilihan.',
									buttons: Ext.MessageBox.OK,
									fn: function(btn){
										if (btn == 'ok') {
											produk_satuan_field.reset();
											produk_satuan_field.focus(false, true);
										}
									},
									icon: Ext.MessageBox.ERROR
								});
								
							}else{
								produk_keterangan_field.focus(false, true);
							}
						});
						task.delay(5);
					}
				},
				blur: function(field, e){
					if (! field.findRecordByValue(field.getValue()) && (field.getRawValue() != '')) {
						produk_satuan_field.reset();
						produk_satuan_field.focus(false, true);
					}
				}
			}
		});

		var produk_date_update_field = Ext.create('Ext.form.field.Date', {
			name: 'produk_date_update', /* column name of table */
			format: 'Y-m-d',
			fieldLabel: 'produk_date_update'
		});

		var produk_bpom_field = Ext.create('Ext.form.field.ComboBox', {
			itemId: 'produk_bpom_field',
			name: 'produk_bpom', /* column name of table */
			fieldLabel: 'Reg/NoReg?',
			anchor : '50%',
			store: Ext.create('Ext.data.Store',{
                    fields: [
                        {type: 'string', name: 'value'},
                        {type: 'string', name: 'name'}
                    ],
                    data : [
                    	 {"value":"Reg", "name":"Reg"},
          				 {"value":"No Reg", "name":"No Reg"}
                    ]
            }),
            queryMode : 'local',
            triggerAction: 'all',
            displayField: 'name',
			valueField: 'value'
		});


        Ext.apply(this, {
            fieldDefaults: {
                labelAlign: 'right',
                labelWidth: 120,
                msgTarget: 'qtip',
				anchor: '100%'
            },
			defaultType: 'textfield',
            items: [produk_id_field,produk_nama_field,produk_kode_field,produk_harga_field,produk_satuan_field,produk_keterangan_field,produk_aktif_field,produk_bpom_field],
			
	        buttons: [{
                iconCls: 'icon-save',
                itemId: 'save',
                text: 'Save',
                disabled: true,
                action: 'save'
            }, {
                iconCls: 'icon-add',
				itemId: 'create',
                text: 'Create',
                action: 'create'
            }, {
                iconCls: 'icon-reset',
                text: 'Cancel',
                action: 'cancel'
            }]
        });
        
        this.callParent();
    }
});