// Switchable victim identities so the deceased victim (Bereaved Family Scheme)
// and the living victim can coexist in the same prototype.
// Applied by the `?victimProfile=` query parameter - see app/routes/v60.js.

const living = {
  victimDeceased: 'no',
  victimTitle: 'Ms',
  victimForename: 'Sarah',
  victimSurname: 'Phillips',
  victimPreferredName: 'Sara',
  victimDateOfBirth: '22/7/1990',
  victimDateOfDeath: '',
  victimAge: '36',
  victimGender: 'Female',
  victimEthnicity: 'White British',
  victimReligion: 'Christian',
  victimPhoneNumber: '+44 (0)7712345678',
  victimEmailAddress: 'sarah.phillips@gmail.com',
  victimAddressLine1: 'Oakhurst House',
  victimAddressLine2: 'Middlehaven Road',
  victimAddressLine3: 'Townville',
  victimPostCode: 'NP14 6LF',
  caseUrn: '42MZ1139323/1',
  familyMembers: []
}

const deceased = {
  victimDeceased: 'yes',
  victimTitle: 'Mr',
  victimForename: 'Fred',
  victimSurname: 'Smith',
  victimPreferredName: '',
  victimDateOfBirth: '3/2/1968',
  victimDateOfDeath: '12/9/2026',
  victimAge: '58',
  victimGender: 'Male',
  victimEthnicity: 'White British',
  victimReligion: 'Christian',
  victimPhoneNumber: '',
  victimEmailAddress: '',
  victimAddressLine1: 'Oakhurst House',
  victimAddressLine2: 'Middlehaven Road',
  victimAddressLine3: 'Townville',
  victimPostCode: 'NP14 6LF',
  caseUrn: '42MZ1140021',
  serviceLead: 'Bereaved Family Scheme',
  familyMembers: [
    {
      firstName: 'Margaret',
      lastName: 'Smith',
      relationship: 'Mother',
      representative: 'Yes',
      email: 'margaret.smith@email.com',
      mobile: '07712 345678',
      pmoc: 'Email'
    },
    {
      firstName: 'David',
      lastName: 'Smith',
      relationship: 'Father',
      representative: 'No',
      email: 'david.smith@email.com',
      mobile: '07700 900123',
      pmoc: 'Telephone'
    },
    {
      firstName: 'Emma',
      lastName: 'Carter',
      relationship: 'Sister',
      representative: 'No',
      email: 'emma.carter@email.com',
      mobile: '07700 900456',
      pmoc: 'Email'
    }
  ]
}

module.exports = { living, deceased }
