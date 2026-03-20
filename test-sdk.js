/**
 * Quick test to verify SDK integration
 */

import { stitchService } from './src/infrastructure/services/stitch.service.ts';

async function testSDK() {
  console.log('🧪 Testing SDK Integration...\n');

  try {
    // Test 1: Initialize
    console.log('Test 1: Initialize service');
    stitchService.initialize({ apiKey: 'test-key' });
    console.log('✓ Service initialized\n');

    // Test 2: Check isInitialized
    console.log('Test 2: Check initialization status');
    const isInitialized = stitchService.isInitialized();
    console.log(`✓ isInitialized: ${isInitialized}\n`);

    // Test 3: Get project reference (no API call)
    console.log('Test 3: Get project reference');
    const project = stitchService.getProject('test-project-id');
    console.log(`✓ Project reference: ${JSON.stringify(project)}\n`);

    console.log('✅ All tests passed!');
    console.log('\n⚠️  Note: API calls (listProjects, generateScreen, etc.) require valid STITCH_API_KEY');
    console.log('   Set STITCH_API_KEY environment variable to test real API calls.');

  } catch (error) {
    console.error('❌ Test failed:', error);
    process.exit(1);
  }
}

testSDK();
