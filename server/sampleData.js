// Pre-configured rich sample demonstrations for users without a Gemini API key
// or for instant zero-latency previewing.

export const SAMPLE_PROJECTS = [
  {
    id: 'sample-cardboard-organizer',
    title: 'Desk Sanctuary: Modular Corrugated Organizer',
    tagline: 'Cardboard & Cork Desk Station',
    problem: 'I need an inexpensive organizer for my study desk to hold pens, notebooks, and my phone.',
    uploadedImagePreview: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400"><rect width="600" height="400" fill="%23e8dfcf"/><rect x="80" y="80" width="240" height="180" rx="8" fill="%23c49a6c" stroke="%238a623a" stroke-width="4"/><path d="M80 140 L320 140 M180 80 L180 260" stroke="%238a623a" stroke-dasharray="4,4"/><rect x="360" y="100" width="160" height="120" rx="6" fill="%23d8ad7e" stroke="%239c6b3e" stroke-width="3"/><circle cx="200" cy="310" r="22" fill="%23c89b76" stroke="%237e5837" stroke-width="2"/><circle cx="260" cy="315" r="22" fill="%23c89b76" stroke="%237e5837" stroke-width="2"/><circle cx="320" cy="305" r="22" fill="%23c89b76" stroke="%237e5837" stroke-width="2"/><text x="300" y="370" font-family="sans-serif" font-size="16" font-weight="bold" fill="%234a3525" text-anchor="middle">Sample Material: Shipping Boxes + Natural Wine Corks</text></svg>',
    additionalMaterialsInput: 'Several natural wine corks, rubber bands, masking tape.',
    constraints: {
      budget: '$5',
      tools: ['Scissors', 'Utility knife', 'Hot glue gun', 'Ruler'],
      time: '45 minutes',
      preserveMaterials: 'Keep the clean kraft outer face unpainted',
      restrictions: 'Must fit in a 12x8 inch desk corner'
    },
    solution: {
      projectName: 'The CorruDock Study Console',
      tagline: 'Multi-tiered desktop organizer with acoustic cork dampening',
      purpose: 'Eliminate desk clutter by repurposing double-wall corrugated cardboard and resilient corks into an ergonomic phone stand, pen caddy, and sticky note dispenser.',
      materialsDetected: [
        {
          name: 'Double-wall Corrugated Cardboard',
          confidence: 'High (95%)',
          condition: 'Sturdy, clean shipping carton with intact flute structure',
          notes: 'Flute orientation should run vertically for maximum load-bearing strength.'
        },
        {
          name: 'Natural Agglomerated Wine Corks (x6)',
          confidence: 'High (90%)',
          condition: 'Intact cylindrical corks, food-grade',
          notes: 'High natural friction and elasticity; perfect as non-slip base pads and phone ledge.'
        },
        {
          name: 'Kraft paper backing',
          confidence: 'Medium (75%)',
          condition: 'Smooth outer liner',
          notes: 'Provides a clean Scandinavian aesthetic without requiring chemical paints.'
        }
      ],
      materialsReused: [
        { item: '1x Medium Shipping Box (approx 12x10x6 in)', source: 'Uploaded materials', prepRequired: 'Flatten seams and remove packing tape residue' },
        { item: '6x Wine Corks', source: 'Uploaded materials', prepRequired: 'Wipe clean and slice 2 corks lengthwise' },
        { item: 'Scrap cardboard flaps', source: 'Uploaded materials', prepRequired: 'Cut into internal dividers' }
      ],
      additionalMaterialsRequired: [
        { item: 'PVA craft glue or hot glue sticks', estCost: '$1.50', essential: true },
        { item: 'Masking or paper tape (optional edge finishing)', estCost: '$1.00', essential: false }
      ],
      toolsRequired: [
        { name: 'Utility knife or sturdy scissors', optional: false, substitute: 'Heavy-duty shears' },
        { name: 'Metal straightedge ruler', optional: false, substitute: 'Hardcover book edge' },
        { name: 'Hot glue gun or glue brush', optional: false, substitute: 'White school glue (allow longer cure time)' },
        { name: 'Pencil', optional: false, substitute: 'Ballpoint pen' }
      ],
      steps: [
        {
          stepNumber: 1,
          title: 'Disassemble & Score Main Shell',
          duration: '10 mins',
          instructions: 'Carefully open the shipping box at the factory glue seam. Using your ruler, measure a 10" x 7" base plate. Cut two identical tiers: a 3" tall rear stepped compartment for notebooks, and a 1.5" front tray for pens.',
          tip: 'Score cardboard along flute lines at half-depth for razor-sharp folds.',
          safetyWarning: 'Always cut away from your body on a self-healing mat or sacrificial scrap board.'
        },
        {
          stepNumber: 2,
          title: 'Fabricate Internal Cross-Lap Dividers',
          duration: '15 mins',
          instructions: 'Cut 3 strip dividers (2.5" tall). Cut matching interlocking vertical slots halfway through each strip. Slot them together like an egg crate to form 4 pen and cable cubbies.',
          tip: 'Interlocking slots provide structural rigidity without needing heavy glue.',
          safetyWarning: 'Mind your fingers when trimming tight slot notches.'
        },
        {
          stepNumber: 3,
          title: 'Incorporate Cork Non-Slip Feet & Phone Cradle',
          duration: '10 mins',
          instructions: 'Slice two wine corks in half along their circumference to create four 0.5" round pedestal feet. Hot glue these to the bottom 4 corners. Glue two whole corks at a 15-degree tilt to form the phone viewing dock.',
          tip: 'The natural cork absorbs desk vibrations and prevents scratching hardwood surfaces.',
          safetyWarning: 'Hot glue guns reach 380°F; do not touch molten adhesive.'
        },
        {
          stepNumber: 4,
          title: 'Final Assembly & Edge Sealing',
          duration: '10 mins',
          instructions: 'Bond the divider assembly into the tiered shell. Fold the kraft flaps over the exposed corrugated top edges with a thin bead of glue for a smooth architectural finish.',
          tip: 'Rubbing a smooth wooden spoon over glued seams creates an ultra-tight laminate bond.',
          safetyWarning: 'Ensure glue is completely cool before loading heavy stationery.'
        }
      ],
      estimatedCost: { total: '$2.50', assumptions: 'Assumes boxes and corks are free; only covers basic glue/tape costs.' },
      difficulty: 'Beginner',
      totalTime: '45 minutes',
      safetyConsiderations: [
        'Use a sharp utility knife blade; dull blades slip and cause injuries.',
        'Beware of hot glue burns — keep a dish of cool water nearby.',
        'Ensure cardboard is dry and free of moisture or mold before construction.'
      ],
      environmentalImpact: {
        wasteDiverted: 'Approx. 450 grams of mixed corrugated paperboard and natural cork diverted from municipal landfill.',
        carbonSaved: 'Saves approx. 1.2 kg CO2e compared to purchasing a new injection-molded virgin plastic desktop organizer.',
        benefits: [
          '100% biodegradable and home-compostable at end-of-life (if assembled with non-toxic PVA glue).',
          'Zero virgin petroleum plastics consumed.',
          'Reclaims packaging that would otherwise undergo carbon-intensive industrial repulping.'
        ],
        limitations: [
          'Not water-resistant; keep away from unsealed beverage cups.',
          'Structural payload capacity maxes out around 3 kg (6.6 lbs).'
        ]
      }
    },
    sampleConstraintSwitch: {
      changedConstraint: 'No glue available (Mechanical joinery only)',
      note: 'User has no hot glue or liquid adhesive.',
      adaptedSolution: {
        projectName: 'The CorruLock Zero-Adhesive Desk Module',
        tagline: 'Friction-fit tab-and-slot desktop organizer',
        purpose: 'Re-engineered to require ZERO adhesive through self-tensioning Japanese joinery techniques, using only slit-and-tongue interlocking tabs and rubber bands.',
        adaptationSummary: {
          whatChanged: [
            'Replaced all glued seams with self-locking wedge tabs and mortise slits.',
            'Swapped glued cork feet for corks compressed into friction-punched base circular cutouts.',
            'Used rubber bands as external tensile ties for the phone kickstand.'
          ],
          whyChanged: 'Without adhesive, the structure must rely on mechanical tension, compression, and interlocking geometric friction to maintain square rigidity under load.',
          tradeoffs: 'Takes slightly longer to measure and cut precise slots (+10 mins), but the entire unit can be disassembled flat for travel or recycling with zero chemical contamination.'
        },
        materialsDetected: [
          { name: 'Double-wall Corrugated Cardboard', confidence: 'High', condition: 'Clean shipping carton' },
          { name: 'Natural Wine Corks (x4)', confidence: 'High', condition: 'Intact' },
          { name: 'Rubber Bands (x4)', confidence: 'High', condition: 'Flexible' }
        ],
        materialsReused: [
          { item: '1x Shipping Box', source: 'Uploaded materials', prepRequired: 'Flatten and measure accurately' },
          { item: '4x Wine Corks', source: 'Uploaded materials', prepRequired: 'Carve tiny grip notches' },
          { item: '4x Rubber bands', source: 'Additional materials', prepRequired: 'Check elasticity' }
        ],
        additionalMaterialsRequired: [
          { item: 'No additional purchased materials required!', estCost: '$0.00', essential: true }
        ],
        toolsRequired: [
          { name: 'Utility knife or scissors', optional: false, substitute: 'Precision craft knife' },
          { name: 'Ruler with millimeter markings', optional: false, substitute: 'Measuring tape' },
          { name: 'Pencil', optional: false }
        ],
        steps: [
          {
            stepNumber: 1,
            title: 'Measure & Cut Tab-and-Slot Grid',
            duration: '15 mins',
            instructions: 'Instead of perimeter walls, cut 4 horizontal shelf tiers with 4mm wide protruding tabs on both ends. Cut matching rectangular receiving slots into the side support panels.',
            tip: 'Cut slots 0.5mm narrower than the cardboard thickness for a tight friction fit.'
          },
          {
            stepNumber: 2,
            title: 'Friction-Press Cork Anchors',
            duration: '10 mins',
            instructions: 'Trace the cork circular cross-section onto the base plate. Cut starburst incisions and push the corks halfway through. The cardboard flaps grip the cork securely.',
            tip: 'Twist the cork like a screw while pushing for a snug socket.'
          },
          {
            stepNumber: 3,
            title: 'Interlock & Tension with Rubber Bands',
            duration: '10 mins',
            instructions: 'Assemble the slotted grid. Hook rubber bands across external tab ears to lock the joints into permanent tension.',
            tip: 'The rubber band acts as an elastic clamp, preventing tabs from slipping.'
          }
        ],
        estimatedCost: { total: '$0.00', assumptions: '100% free; completely utilizes existing household items.' },
        difficulty: 'Intermediate (requires precise cuts)',
        totalTime: '35 minutes',
        safetyConsiderations: ['Precision slot cutting requires controlled blade pressure on firm surface.'],
        environmentalImpact: {
          wasteDiverted: '480g cardboard + corks + bands',
          carbonSaved: '1.4 kg CO2e',
          benefits: ['Completely modular; can be flat-packed and 100% cleanly recycled without adhesive contamination.'],
          limitations: ['Joints may loosen if subjected to heavy sideways torque.']
        }
      }
    }
  },
  {
    id: 'sample-glass-planter',
    title: 'AeroSprout: Self-Watering Hydro Herb Jars',
    tagline: 'Glass Jars & Twine Wicking Planter',
    problem: 'I want a low-maintenance indoor herb garden for my kitchen windowsill using empty glass jars.',
    uploadedImagePreview: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400"><rect width="600" height="400" fill="%23e2ebe4"/><rect x="120" y="110" width="110" height="170" rx="16" fill="%23cbe3d3" stroke="%235a8f6d" stroke-width="4" opacity="0.85"/><ellipse cx="175" cy="120" rx="45" ry="14" fill="%23ffffff" stroke="%235a8f6d" stroke-width="3"/><rect x="270" y="90" width="120" height="190" rx="16" fill="%23b8dcc2" stroke="%23437a56" stroke-width="4" opacity="0.85"/><ellipse cx="330" cy="100" rx="50" ry="15" fill="%23ffffff" stroke="%23437a56" stroke-width="3"/><path d="M420 180 Q 450 140 480 200 T 520 220" stroke="%239a7b56" stroke-width="6" fill="none" stroke-linecap="round"/><circle cx="480" cy="240" r="30" fill="%23d6c1a5" stroke="%238a6a43" stroke-width="3"/><text x="300" y="365" font-family="sans-serif" font-size="16" font-weight="bold" fill="%23234d31" text-anchor="middle">Sample Material: Glass Pasta Sauce Jars + Jute Twine</text></svg>',
    additionalMaterialsInput: 'Jute twine ball, cotton rope scrap, 2 empty plastic yogurt cups.',
    constraints: {
      budget: '$0 - $3',
      tools: ['Scissors', 'Hole punch or nail', 'Ruler'],
      time: '30 minutes',
      preserveMaterials: 'Do not drill or crack the glass jars',
      restrictions: 'Must not leak water onto wooden windowsill'
    },
    solution: {
      projectName: 'The Sub-Irrigated HydroSprout Trio',
      tagline: 'Passive capillary wicking herb planters with zero glass alteration',
      purpose: 'Transforms empty glass sauce jars and plastic yogurt cups into high-efficiency sub-irrigated planters where capillary action feeds herbs constantly without root rot.',
      materialsDetected: [
        { name: 'Wide-mouth Glass Food Jars (x2)', confidence: 'High (98%)', condition: 'Clean, intact glass', notes: 'Impermeable reservoir; transparent allows instant visual water level checks.' },
        { name: 'Braided Jute Twine & Cotton Cord', confidence: 'High (92%)', condition: 'Natural untreated fibers', notes: 'Natural cellulose fibers provide outstanding capillary capillary siphon action.' },
        { name: 'Plastic Yogurt/Sour Cream Cups', confidence: 'Medium (85%)', condition: 'Clean PP polypropylene cups', notes: 'Flanged rim sits securely inside jar lip.' }
      ],
      materialsReused: [
        { item: '2x 24oz Glass Jars', source: 'Uploaded materials', prepRequired: 'Soak in warm soapy water to strip paper label and adhesive' },
        { item: '2x Plastic yogurt/deli containers', source: 'Additional materials', prepRequired: 'Wash thoroughly and trim height to fit upper jar neck' },
        { item: '4 feet of 100% natural cotton or jute rope', source: 'Uploaded materials', prepRequired: 'Cut into 12-inch wicking strands' }
      ],
      additionalMaterialsRequired: [
        { item: 'Small handful of potting soil & herb seeds (basil/mint/parsley)', estCost: '$2.00', essential: true }
      ],
      toolsRequired: [
        { name: 'Scissors', optional: false },
        { name: 'Small nail or punch', optional: false, substitute: 'Skewer or clean screwdriver tip' }
      ],
      steps: [
        {
          stepNumber: 1,
          title: 'Prepare Soil Inset Cup',
          duration: '8 mins',
          instructions: 'Take the clean plastic yogurt cup. Using your nail, puncture 3 drainage holes in the bottom and one central 1/4" hole for the wicking rope.',
          tip: 'Warm the nail tip under hot water to cleanly melt through plastic without cracking.',
          safetyWarning: 'Puncture downward against a wooden cutting board.'
        },
        {
          stepNumber: 2,
          title: 'Thread Capillary Wick',
          duration: '7 mins',
          instructions: 'Thread the natural cotton/jute rope through the central hole so 4 inches dangle out into the lower water reservoir, and 4 inches coil upward into the soil chamber.',
          tip: 'Fray the upper strands slightly to distribute moisture evenly across roots.',
          safetyWarning: 'Ensure fibers are untreated natural cotton or jute (synthetic nylon will not wick water).'
        },
        {
          stepNumber: 3,
          title: 'Plant Herb & Fill Water Reservoir',
          duration: '10 mins',
          instructions: 'Fill the upper cup with potting mix and plant seeds or cuttings. Fill the glass jar with 2 inches of water. Suspend the cup inside the jar neck so the wick is submerged.',
          tip: 'Add a drop of diluted seaweed fertilizer to the reservoir water every two weeks.',
          safetyWarning: 'Keep water level 1/2 inch below the bottom of the plastic cup to ensure oxygen reaches roots.'
        }
      ],
      estimatedCost: { total: '$2.00', assumptions: 'Only for seeds/soil; all containers and wicks are reclaimed.' },
      difficulty: 'Beginner',
      totalTime: '25 minutes',
      safetyConsiderations: ['Handle glass carefully; do not force oversized cups into tight rims.'],
      environmentalImpact: {
        wasteDiverted: 'Two heavy glass jars (~700g) and two single-use plastic cups (~40g) kept out of landfill.',
        carbonSaved: '2.1 kg CO2e saved vs manufacturing glazed ceramic pots.',
        benefits: ['Reduces plant water consumption by 60% compared to top-watering due to zero evaporation waste.', 'Year-round fresh herbs right at hand.'],
        limitations: ['Algae may form in clear reservoir over months; wrap lower jar in scrap burlap or paper to block direct sunlight.']
      }
    },
    sampleConstraintSwitch: {
      changedConstraint: 'Only 15 minutes available',
      note: 'User has urgent deadline and wants the quickest working setup.',
      adaptedSolution: {
        projectName: 'The RapidWick 10-Minute Windowsill Planter',
        tagline: 'Ultralight instant-wicking glass herb setup',
        purpose: 'Streamlined design that skips complex multi-cup nesting, using inverted jar lid suspension and raw twine wrapping in under 10 minutes.',
        adaptationSummary: {
          whatChanged: [
            'Eliminated plastic cup trimming step; used simple macramé twine harness around jar neck.',
            'Direct hydro-propagation (water rooting) instead of soil repotting.',
            'Cuttings rest directly in oxygenated water collar.'
          ],
          whyChanged: 'Soil preparation and precision puncture holes take 15-20 minutes. Water rooting herb cuttings (mint, basil, rosemary) takes less than 8 minutes and requires no potting mix.',
          tradeoffs: 'Best suited for rootable herb cuttings (mint/basil) rather than growing from raw seed.'
        },
        materialsDetected: [
          { name: 'Glass Food Jars', confidence: 'High', condition: 'Intact' },
          { name: 'Jute Twine', confidence: 'High', condition: 'Natural' }
        ],
        materialsReused: [
          { item: '2x Glass Jars', source: 'Uploaded materials', prepRequired: 'Quick rinse' },
          { item: 'Jute twine', source: 'Uploaded materials', prepRequired: 'Tie simple neck loop' }
        ],
        additionalMaterialsRequired: [
          { item: 'Fresh kitchen herb sprigs (grocery store basil/mint)', estCost: '$0.00', essential: true }
        ],
        toolsRequired: [{ name: 'Kitchen scissors', optional: false }],
        steps: [
          {
            stepNumber: 1,
            title: 'Rinse & Tie Suspension Collar',
            duration: '4 mins',
            instructions: 'Rinse jars. Tie a secure double knot of twine around the threaded neck of the jar, creating an elegant hanging or carry loop.',
            tip: 'Natural jute creates an instant cottagecore aesthetic.'
          },
          {
            stepNumber: 2,
            title: 'Water Fill & Stem Placement',
            duration: '5 mins',
            instructions: 'Fill jars 3/4 with tap water. Strip bottom leaves off herb cuttings and place stems into the water so the nodes are submerged.',
            tip: 'Roots will sprout vigorously from stem nodes within 5 to 7 days.'
          }
        ],
        estimatedCost: { total: '$0.00', assumptions: 'Zero cost using grocery herb stems.' },
        difficulty: 'Beginner',
        totalTime: '9 minutes',
        safetyConsiderations: ['Ensure clean water to prevent bacterial growth.'],
        environmentalImpact: {
          wasteDiverted: '700g glass container waste',
          carbonSaved: '1.9 kg CO2e',
          benefits: ['Fastest possible reuse path with 100% zero tools beyond scissors.'],
          limitations: ['Nutrient replenishment required after 4 weeks.']
        }
      }
    }
  },
  {
    id: 'sample-pallet-riser',
    title: 'TimberLift: Ergonomic Wooden Laptop Stand',
    tagline: 'Pallet Wood & Dowel Laptop Riser',
    problem: 'I need an ergonomic laptop riser to reduce neck strain while working from home.',
    uploadedImagePreview: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400"><rect width="600" height="400" fill="%23ece6db"/><rect x="80" y="100" width="440" height="45" rx="4" fill="%23a07a4e" stroke="%236e5030" stroke-width="3"/><rect x="80" y="160" width="440" height="45" rx="4" fill="%23b89062" stroke="%236e5030" stroke-width="3"/><rect x="80" y="220" width="440" height="45" rx="4" fill="%23946d42" stroke="%236e5030" stroke-width="3"/><circle cx="120" cy="122" r="5" fill="%233b2817"/><circle cx="480" cy="122" r="5" fill="%233b2817"/><circle cx="120" cy="182" r="5" fill="%233b2817"/><circle cx="480" cy="182" r="5" fill="%233b2817"/><text x="300" y="340" font-family="sans-serif" font-size="16" font-weight="bold" fill="%233e2b1b" text-anchor="middle">Sample Material: Weathered Pine Pallet Slats</text></svg>',
    additionalMaterialsInput: 'Coarse sandpaper scrap, wood glue, four screws.',
    constraints: {
      budget: '$0',
      tools: ['Hand saw', 'Sandpaper', 'Screwdriver', 'Ruler'],
      time: '1 hour',
      preserveMaterials: 'Preserve the rustic timber patina and saw marks',
      restrictions: 'Must support a heavy 16-inch aluminum laptop without wobbling'
    },
    solution: {
      projectName: 'The TimberVent Ergonomic Riser',
      tagline: 'Passive-cooling dual-triangle laptop pedestal',
      purpose: 'Raises laptop screen 5.5 inches to eye level for optimal cervical spine posture while providing 360-degree unobstructed airflow beneath the processor heatsink.',
      materialsDetected: [
        { name: 'Heat-Treated Pine Wood Slats (HT stamp)', confidence: 'High (95%)', condition: 'Sound hardwood/softwood mix with dry weathered surface', notes: 'Look for HT (Heat Treated) stamp rather than MB (Methyl Bromide) for indoor safety.' },
        { name: 'Weathered Patina', confidence: 'High (90%)', condition: 'Natural grey-gold oxidized wood', notes: 'Retain rustic face grain.' }
      ],
      materialsReused: [
        { item: '2x Pallet Top Boards (approx 3.5" wide x 16" long)', source: 'Uploaded materials', prepRequired: 'De-nail, inspect for staples, and sand rough splinters' }
      ],
      additionalMaterialsRequired: [
        { item: 'Wood glue or 4 small wood screws (1.25 inch)', estCost: '$0.50', essential: true }
      ],
      toolsRequired: [
        { name: 'Hand saw or Japanese pull saw', optional: false, substitute: 'Miter saw' },
        { name: 'Sandpaper (80-grit & 120-grit)', optional: false },
        { name: 'Ruler & pencil', optional: false }
      ],
      steps: [
        {
          stepNumber: 1,
          title: 'Mark Dual Incline Angles',
          duration: '15 mins',
          instructions: 'On one pallet slat, mark two mirrored right triangles with a 20-degree incline slope: 10" base, 4.5" height, and 11" diagonal hypotenuse with a 0.75" front retaining lip.',
          tip: '20 degrees is the ergonomic golden angle for comfortable wrist typing.'
        },
        {
          stepNumber: 2,
          title: 'Cut & Sand Wedge Rails',
          duration: '25 mins',
          instructions: 'Saw along your marked lines. Sand all edges thoroughly to eliminate splinters while leaving the rustic aged face intact.',
          tip: 'Clamp both pieces together while sanding so their profiles match 100% symmetrically.',
          safetyWarning: 'Wear a safety dust mask when sanding aged wood.'
        },
        {
          stepNumber: 3,
          title: 'Fasten Cross-Brace & Non-Slip Pads',
          duration: '20 mins',
          instructions: 'Cut a 9" cross-brace strip from leftover offcut. Fasten the two triangular side rails together using screws or wood glue. Attach cork or felt pads beneath contact points.',
          tip: 'Pre-drill pilot holes to prevent the aged timber from splitting.',
          safetyWarning: 'Ensure screws are countersunk beneath the wood surface.'
        }
      ],
      estimatedCost: { total: '$0.00', assumptions: '100% free with reclaimed timber offcuts.' },
      difficulty: 'Intermediate',
      totalTime: '60 minutes',
      safetyConsiderations: [
        'Check pallet wood carefully for hidden nails or wire staples before cutting.',
        'Always confirm wood was Heat Treated (HT) and not chemically fumigated.'
      ],
      environmentalImpact: {
        wasteDiverted: '1.2 kg discarded industrial timber salvaged.',
        carbonSaved: '3.8 kg CO2e vs purchasing an anodized aluminum or plastic desktop riser.',
        benefits: ['High thermal dissipation keeps laptop 8°C cooler.', 'Durable solid wood lasts decades.'],
        limitations: ['Heavier than travel stands; intended as a stationary desk fixture.']
      }
    },
    sampleConstraintSwitch: {
      changedConstraint: 'No cutting allowed (Zero sawing tools)',
      note: 'User has no saw and cannot cut the wood slats.',
      adaptedSolution: {
        projectName: 'The GravityStack Zero-Cut Timber Wedge',
        tagline: 'Friction-stacked cantilevered laptop prop',
        purpose: 'Uses raw uncut pallet boards in an overlapping interlocking bridge configuration with heavy books or rubber bands, requiring zero sawing.',
        adaptationSummary: {
          whatChanged: [
            'Eliminated all angled saw cuts.',
            'Swapped custom triangular wedges for an offset fulcrum lap stack.',
            'Boards remain full length and can be repurposed for other projects in the future.'
          ],
          whyChanged: 'Without a saw, angle shaping is impossible. We leverage the natural cantilever of stacked full-length boards balanced against the desk rear.',
          tradeoffs: 'Footprint is larger on the desk (16 inches wide), but requires zero cutting tools.'
        },
        materialsDetected: [{ name: 'Pallet Wood Slats (Full Length)', confidence: 'High', condition: 'Intact' }],
        materialsReused: [{ item: '2x Full Length Pallet Boards', source: 'Uploaded materials', prepRequired: 'Clean surface dust' }],
        additionalMaterialsRequired: [{ item: 'Heavy twine or two binder clamps', estCost: '$0.00', essential: false }],
        toolsRequired: [{ name: 'None (Hand assembly only)', optional: false }],
        steps: [
          {
            stepNumber: 1,
            title: 'Stack Stepped Fulcrum',
            duration: '5 mins',
            instructions: 'Lay the first board flat 4 inches from back wall. Place the second board overlapping at a 15-degree rear tilt with its back edge resting on the first.',
            tip: 'The weight of the laptop naturally locks the fulcrum in place.'
          }
        ],
        estimatedCost: { total: '$0.00', assumptions: 'Completely free.' },
        difficulty: 'Beginner',
        totalTime: '5 minutes',
        safetyConsiderations: ['Ensure boards are stable on flat desk surface.'],
        environmentalImpact: { wasteDiverted: '1.2 kg wood', carbonSaved: '3.8 kg CO2e', benefits: ['100% reversible; boards not damaged'], limitations: ['Fixed elevation angle'] }
      }
    }
  }
];
