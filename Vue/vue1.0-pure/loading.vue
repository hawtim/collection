<!-- loading.vue -->

<div id="help">
    <loading v-show="showLoading" ></loading>
    <modal-dialog :show="showDialog">
        <header class="dialog-header" slot="header">
            <h1 class="dialog-title">Server Error</h1>
        </header>
        <div class="dialog-body" slot="body">
            <p class="error">Oops,server has got some errors, error code: {{errorCode}}.</p>
        </div>
    </modal-dialog>
</div>



<template id="loading-template">
	<div id="loading-overlay">
		<div class="sk-three-bounce">
			<div class="sk-child sk-bounce1"></div>
			<div class="sk-child sk-bounce2"></div>
			<div class="sk-child sk-bounce3"></div>
		</div>
	</div>
</template>


<script>
	var help = new Vue({
        el: '#help',
        data: {
            showLoading: false,
            showDialog: false,
            errorCode: ''
        },
        components: {
            'loading': {
                template: '#loading-template',
            }
        }
    })

	Vue.http.interceptors.push((request, next) => {
    help.showLoading = true
    next((response) => {
        if(!response.ok){
            help.errorCode = response.status
            help.showDialog = true
        }
        help.showLoading = false
        return response
    });
});


	
</script>