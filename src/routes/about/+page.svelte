<script>
	import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';
	import {
		IconEyeglass2,
		IconViewfinder,
		IconUsers,
		IconPlaneTilt,
		IconCpu,
		IconWorldWww,
		IconDrone,
		IconDiamonds
	} from '@tabler/icons-svelte';
</script>

<div class="container items-center justify-center w-full h-screen min-w-full min-h-screen">
	<div
		class="flex flex-col w-full h-screen max-w-6xl pt-6 m-auto mb-4 overflow-y-scroll pb-14 hide-scrollbar"
	>
		<div class="flex shadow-2xl shadow-red">
			<img
				class="w-full rounded-t-xl rounded-ee-lg"
				src="assets/a0.jpg"
				alt="Sunset in the mountains"
			/>
		</div>
		<div class="flex shadow-lg rounded-b-xl overflow-scroll bg-[#f3f4f6] dark:bg-[#1f2937]">
			<Accordion autocollapse>
				<AccordionItem>
					<svelte:fragment slot="lead"><IconEyeglass2 /></svelte:fragment>
					<svelte:fragment slot="summary"
						><span class="font-black">Who Are We ?</span></svelte:fragment
					>
					<svelte:fragment slot="content"
						>&emsp;Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus molestias saepe
						neque consectetur laudantium maxime! In assumenda molestiae vitae laudantium incidunt,
						accusantium distinctio molestias, adipisci mollitia, commodi rerum alias quo.</svelte:fragment
					>
				</AccordionItem>
				<AccordionItem>
					<svelte:fragment slot="lead"><IconViewfinder /></svelte:fragment>
					<svelte:fragment slot="summary"
						><span class="font-black">Our Mission</span></svelte:fragment
					>
					<svelte:fragment slot="content"
						>&emsp;Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rerum nostrum delectus
						similique doloribus expedita eius quibusdam vero, explicabo assumenda saepe illum totam
						nam omnis tenetur labore officia accusamus dolorem eaque.</svelte:fragment
					>
				</AccordionItem>
				<AccordionItem>
					<svelte:fragment slot="lead"><IconDiamonds /></svelte:fragment>
					<svelte:fragment slot="summary"
						><span class="font-black">What's S.A.F.İ.R ?</span></svelte:fragment
					>
					<svelte:fragment slot="content"
						>&emsp;Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rerum nostrum delectus
						similique doloribus expedita eius quibusdam vero, explicabo assumenda saepe illum totam
						nam omnis tenetur labore officia accusamus dolorem eaque.</svelte:fragment
					>
				</AccordionItem>
				<AccordionItem>
					<svelte:fragment slot="lead"><IconUsers /></svelte:fragment>
					<svelte:fragment slot="summary"
						><span class="font-black">Team Members</span></svelte:fragment
					>
					<svelte:fragment slot="content"
						><Accordion autocollapse>
							<AccordionItem>
								<svelte:fragment slot="lead"><IconCpu /></svelte:fragment>

								<svelte:fragment slot="summary"
									><span class="font-medium">Mert Sefa Akgün</span></svelte:fragment
								>
								<svelte:fragment slot="content"
									>&emsp;Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo
									doloribus consequuntur officia ratione inventore cumque recusandae, corporis
									consectetur iure laborum quas quidem sint quo unde, impedit minus voluptates
									repellendus temporibus?.</svelte:fragment
								>
							</AccordionItem>
							<!-- <AccordionItem>
								<svelte:fragment slot="lead"><IconPlaneTilt /></svelte:fragment>

								<svelte:fragment slot="summary"
									><span class="font-medium">Emre Uzun</span></svelte:fragment
								>
								<svelte:fragment slot="content"
									>&emsp;Lorem ipsum, dolor sit amet consectetur adipisicing elit. Incidunt ut
									pariatur eius cum nulla, velit corporis expedita id similique iure reiciendis,
									doloribus rerum deleniti quia dolorem error saepe consequuntur maxime.</svelte:fragment
								>
							</AccordionItem> -->
							<AccordionItem>
								<svelte:fragment slot="lead"><IconWorldWww /></svelte:fragment>
								<svelte:fragment slot="summary"
									><span class="font-medium">Fatih Özkurt</span></svelte:fragment
								>
								<svelte:fragment slot="content"
									>&emsp;Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptate modi
									officiis consequatur eaque at fuga voluptatem. Aliquam temporibus blanditiis porro
									dolores esse, distinctio, nisi reiciendis officiis obcaecati alias eligendi vitae.</svelte:fragment
								>
							</AccordionItem>
							<!-- <AccordionItem>
								<svelte:fragment slot="lead"><IconDrone /></svelte:fragment>
								<svelte:fragment slot="summary"
									><span class="font-medium">Alperen Çankaya</span></svelte:fragment
								>
								<svelte:fragment slot="content"
									>&emsp;Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga labore
									necessitatibus in optio quod a recusandae tempora libero iste! Porro non
									reiciendis pariatur nulla quia reprehenderit minus autem eius labore?</svelte:fragment
								>
							</AccordionItem> -->

							<AccordionItem>
								<svelte:fragment slot="lead"><IconDrone /></svelte:fragment>
								<svelte:fragment slot="summary"
									><span class="font-medium">Emre Uzun</span></svelte:fragment
								>
								<svelte:fragment slot="content"
									>&emsp;Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptate modi
									officiis consequatur eaque at fuga voluptatem. Aliquam temporibus blanditiis porro
									dolores esse, distinctio, nisi reiciendis officiis obcaecati alias eligendi vitae.</svelte:fragment
								>
							</AccordionItem>
						</Accordion></svelte:fragment
					>
				</AccordionItem>
			</Accordion>
		</div>
	</div>
</div>
