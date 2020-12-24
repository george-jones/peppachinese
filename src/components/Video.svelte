<style>
#video-container {
	width: 100%;
	text-align: center;
}
</style>

<script>
export let name;
let full_name = 'video/' + name;
</script>
<div id="video-container">
	<video src="{full_name}" width="1024" height="576" controls />
</div>
