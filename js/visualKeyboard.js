let buttons = document.querySelectorAll("button");
let input = document.getElementById("input");

buttons.forEach(function (elem)
{
	elem.addEventListener("click", function ()
	{
		console.log(`clicked ${elem.id}`);

		if (input.value.length > CurrentWord.length)
		{
			input.value += input.value + elem.id;
		}
	});
});
