Ext.define('YMPI.view.MASTER.PRODUK', {
	extend: 'Ext.tab.Panel',
	
	alias	: 'widget.PRODUK',
	
	title	: 'Produk',
	margins: 0,
	tabPosition: 'right',
	closable : true,
	activeTab: 0,
	
	initComponent: function(){
		Ext.apply(this, {
            items: [{
				xtype	: 'Listproduk'
			}, {
				xtype: 'v_produk_form',
				disabled: true
			}]
        });
		this.callParent(arguments);
	}
	
});