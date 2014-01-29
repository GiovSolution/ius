Ext.define('YMPI.view.MASTER.v_supplier', {
	extend: 'Ext.grid.Panel',
	requires: ['YMPI.store.s_supplier'],
	
	title		: 'Supplier',
	itemId		: 'Listsupplier',
	alias       : 'widget.Listsupplier',
	store 		: 's_supplier',
	columnLines : true,
	frame		: false,
	
	margin		: 0,
	selectedIndex : -1,
	
	initComponent: function(){		
		this.columns = [
			{
				header: 'No Supplier',
				dataIndex: 'supplier_id'
			},{
				header: 'Cabang',
				dataIndex: 'cabang_nama'
			},{
				header: 'Nama',
				dataIndex: 'supplier_nama'
			},{
				header: 'Alamat',
				dataIndex: 'supplier_alamat'
			},{
				header: 'Kota',
				dataIndex: 'supplier_kota'
			},{
				header: 'Kode Pos',
				hidden : false,
				dataIndex: 'supplier_kodepos'
			},{
				header: 'Propinsi',
				hidden :true,
				dataIndex: 'supplier_propinsi'
			},{
				header: 'Negara',
				hidden :true,
				dataIndex: 'supplier_negara'
			},{
				header: 'No Telp',
				hidden :true,
				dataIndex: 'supplier_notelp'
			},{
				header: 'No Telp 2',
				hidden :true,
				dataIndex: 'supplier_notelp2'
			},{
				header: 'No Fax',
				hidden :true,
				dataIndex: 'supplier_nofax'
			},{
				header: 'Email',
				hidden :true,
				dataIndex: 'supplier_email'
			},{
				header: 'Website',
				hidden :true,
				dataIndex: 'supplier_website'
			},{
				header: 'CP',
				hidden :true,
				dataIndex: 'supplier_cp'
			},{
				header: 'Contact CP',
				hidden :true,
				dataIndex: 'supplier_contact_cp'
			},{
				header: 'Akun',
				hidden :true,
				dataIndex: 'supplier_akun'
			},{
				header: 'Keterangan',
				dataIndex: 'supplier_keterangan'
			},{
				header: 'Aktif',
				dataIndex: 'supplier_aktif'
			},{
				header: 'Creator',
				hidden :true,
				dataIndex: 'supplier_creator'
			},{
				header: 'Date Create',
				hidden :true,
				dataIndex: 'supplier_date_create',
				renderer: Ext.util.Format.dateRenderer('d M, Y')
			},{
				header: 'Updater',
				hidden :true,
				dataIndex: 'supplier_update'
			},{
				header: 'Date Update',
				hidden :true,
				dataIndex: 'supplier_date_update',
				renderer: Ext.util.Format.dateRenderer('d M, Y')
			},{
				header: 'Revised',
				hidden :true,
				dataIndex: 'supplier_revised'
			}];
		this.dockedItems = [
			Ext.create('Ext.toolbar.Toolbar', {
				items: [{
					xtype: 'fieldcontainer',
					layout: 'hbox',
					defaultType: 'button',
					items: [{
						text	: 'Add',
						iconCls	: 'icon-add',
						action	: 'create'
					}, {
						xtype: 'splitter'
					}, {
						itemId	: 'btndelete',
						text	: 'Delete',
						iconCls	: 'icon-remove',
						action	: 'delete',
						disabled: true
					}]
				}, '-', {
					xtype: 'fieldcontainer',
					layout: 'hbox',
					defaultType: 'button',
					items: [{
						text	: 'Export Excel',
						iconCls	: 'icon-excel',
						action	: 'xexcel'
					}, {
						xtype: 'splitter'
					}, {
						text	: 'Export PDF',
						iconCls	: 'icon-pdf',
						action	: 'xpdf'
					}, {
						xtype: 'splitter'
					}, {
						text	: 'Cetak',
						iconCls	: 'icon-print',
						action	: 'print'
					}]
				}]
			}),
			{
				xtype: 'pagingtoolbar',
				store: 's_supplier',
				dock: 'bottom',
				displayInfo: true
			}
		];
		this.callParent(arguments);
		
		this.on('itemclick', this.gridSelection);
		this.getView().on('refresh', this.refreshSelection, this);
	},	
	
	gridSelection: function(me, record, item, index, e, eOpts){
		//me.getSelectionModel().select(index);
		this.selectedIndex = index;
		this.getView().saveScrollState();
	},
	
	refreshSelection: function() {
        this.getSelectionModel().select(this.selectedIndex);   /*Ext.defer(this.setScrollTop, 30, this, [this.getView().scrollState.top]);*/
    }

});