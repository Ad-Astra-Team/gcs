<script>
	import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';
	import {
		IconEyeglass2,
		IconViewfinder,
		IconUsers,
		IconPlaneTilt,
		IconCpu,
		IconCarouselVertical
	} from '@tabler/icons-svelte';
</script>

<div class="container items-center justify-center w-full h-screen min-w-full min-h-screen">
	<div
		class="flex flex-col w-full h-screen max-w-6xl pt-12 m-auto mb-4 overflow-scroll bg-scroll shadow-lg pb-14 scroll-auto hide-scrollbar l"
	>
		<img
			class="w-full rounded-t-xl"
			src="src\routes\about\thumbs\a1.jpg"
			alt="Sunset in the mountains"
		/>
		<div class="flex rounded-b-xl bg-[#f3f4f6] dark:bg-[#1f2937]">
			<Accordion>
				<AccordionItem>
					<svelte:fragment slot="lead"><IconEyeglass2 /></svelte:fragment>
					<svelte:fragment slot="summary"
						><span class="font-black">Vizyonumuz</span></svelte:fragment
					>
					<svelte:fragment slot="content"
						>&emsp;Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
						Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown
						printer took a galley of type and scrambled it to make a type specimen book. It has
						survived not only five centuries, but also the leap into electronic typesetting,
						remaining essentially unchanged. It was popularised in the 1960s with the release of
						Letraset sheets containing Lorem Ipsum passages, and more recently with desktop
						publishing software like Aldus PageMaker including versions of Lorem Ipsum.</svelte:fragment
					>
				</AccordionItem>
				<AccordionItem>
					<svelte:fragment slot="lead"><IconViewfinder /></svelte:fragment>
					<svelte:fragment slot="summary"
						><span class="font-black">Misyonumuz</span></svelte:fragment
					>
					<svelte:fragment slot="content"
						>&emsp;Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
						Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown
						printer took a galley of type and scrambled it to make a type specimen book. It has
						survived not only five centuries, but also the leap into electronic typesetting,
						remaining essentially unchanged. It was popularised in the 1960s with the release of
						Letraset sheets containing Lorem Ipsum passages, and more recently with desktop
						publishing software like Aldus PageMaker including versions of Lorem Ipsum.</svelte:fragment
					>
				</AccordionItem>
				<AccordionItem>
					<svelte:fragment slot="lead"><IconUsers /></svelte:fragment>
					<svelte:fragment slot="summary"><span class="font-black">Takımımız</span></svelte:fragment
					>
					<svelte:fragment slot="content"
						><Accordion>
							<AccordionItem>
								<svelte:fragment slot="lead"><IconCpu /></svelte:fragment>

								<svelte:fragment slot="summary"
									><span class="font-medium">Mert Sefa Akgün</span></svelte:fragment
								>
								<svelte:fragment slot="content"
									>&emsp;Lorem Ipsum is simply dummy text of the printing and typesetting industry.
									Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when
									an unknown printer took a galley of type and scrambled it to make a type specimen
									book. It has survived not only five centuries, but also the leap into electronic
									typesetting, remaining essentially unchanged. It was popularised in the 1960s with
									the release of Letraset sheets containing Lorem Ipsum passages, and more recently
									with desktop publishing software like Aldus PageMaker including versions of Lorem
									Ipsum.</svelte:fragment
								>
							</AccordionItem>
							<AccordionItem>
								<svelte:fragment slot="lead"><IconPlaneTilt /></svelte:fragment>

								<svelte:fragment slot="summary"
									><span class="font-medium">Emre Uzun</span></svelte:fragment
								>
								<svelte:fragment slot="content"
									>&emsp;Lorem Ipsum is simply dummy text of the printing and typesetting industry.
									Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when
									an unknown printer took a galley of type and scrambled it to make a type specimen
									book. It has survived not only five centuries, but also the leap into electronic
									typesetting, remaining essentially unchanged. It was popularised in the 1960s with
									the release of Letraset sheets containing Lorem Ipsum passages, and more recently
									with desktop publishing software like Aldus PageMaker including versions of Lorem
									Ipsum.</svelte:fragment
								>
							</AccordionItem>
							<AccordionItem>
								<svelte:fragment slot="lead"><IconCarouselVertical /></svelte:fragment>
								<svelte:fragment slot="summary"
									><span class="font-medium">Fatih Özkurt</span></svelte:fragment
								>
								<svelte:fragment slot="content"
									>&emsp;Lorem Ipsum is simply dummy text of the printing and typesetting industry.
									Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when
									an unknown printer took a galley of type and scrambled it to make a type specimen
									book. It has survived not only five centuries, but also the leap into electronic
									typesetting, remaining essentially unchanged. It was popularised in the 1960s with
									the release of Letraset sheets containing Lorem Ipsum passages, and more recently
									with desktop publishing software like Aldus PageMaker including versions of Lorem
									Ipsum.</svelte:fragment
								>
							</AccordionItem>
						</Accordion></svelte:fragment
					>
				</AccordionItem>
			</Accordion>
		</div>
	</div>
</div>
