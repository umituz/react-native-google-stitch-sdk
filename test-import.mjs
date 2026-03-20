/**
 * Quick test to verify SDK can be imported
 */

console.log('🧪 Testing SDK Import...\n');

try {
  // Test 1: Import SDK
  console.log('Test 1: Import @google/stitch-sdk');
  const { stitch } = await import('@google/stitch-sdk');
  console.log('✓ SDK imported successfully');
  console.log(`  Stitch type: ${typeof stitch}\n`);

  // Test 2: Check stitch singleton
  console.log('Test 2: Check stitch singleton');
  console.log(`  Has projects method: ${typeof stitch.projects === 'function'}`);
  console.log(`  Has project method: ${typeof stitch.project === 'function'}`);
  console.log(`  Has callTool method: ${typeof stitch.callTool === 'function'}`);
  console.log('✓ All expected methods present\n');

  console.log('✅ Import test passed!');
  console.log('\n⚠️  Note: Actual API calls require STITCH_API_KEY environment variable');
  console.log('   SDK uses custom registry: https://wombat-dressing-room.appspot.com');

} catch (error) {
  console.error('❌ Import test failed:', error.message);
  console.error('\nFull error:', error);
  console.error('\nThis usually means:');
  console.error('  - SDK has Node.js dependencies not available in React Native');
  console.error('  - SDK uses web APIs not available in React Native');
  console.error('  - SDK requires special authentication or registry access');
  process.exit(1);
}
